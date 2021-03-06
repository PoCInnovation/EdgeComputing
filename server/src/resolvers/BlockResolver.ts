import { ApolloError } from 'apollo-server-express';
import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Block from '../entities/Block';
import { ContextInterface } from '../interfaces/Context';
import BlockRepository from '../repositories/BlockRepository';
import SceneRepository from '../repositories/SceneRepository';
import { newImageProps } from '../worker/NewImage';
import { Queue, QueueTypes } from '../worker/Queue';

@Resolver(of => Block)
export default class BlockResolver {
  constructor(
    @InjectRepository(BlockRepository) private readonly repository: BlockRepository,
    @InjectRepository(SceneRepository) private readonly sceneRepository: SceneRepository
  ) {}

  @Query(returns => Block, { nullable: true })
  block(@Arg('id', type => Int) id: number) {
    return this.repository.findOne(id, { relations: ['scene'] });
  }

  @Query(returns => [Block], { nullable: true })
  blocks(@Arg('sceneId', type => Int) sceneId: number) {
    return this.repository.find({
      where: {
        scene: {
          id: sceneId
        }
      },
      relations: ['scene']
    });
  }

  @Query(returns => Block, { nullable: true })
  newBlock() {
    return this.sceneRepository.getNewBlock();
  }

  @Mutation(returns => Block)
  async updateBlock(@Arg('id', type => Int) id: number, @Arg('data') data: string, @Ctx() { onWorkDone }: ContextInterface) {
    const block = await this.repository.findOne(id, { relations: ['scene'] });

    if (block === undefined) {
      throw new ApolloError('This block doesn\'t exist');
    }

    block.data = data;

    if (block.x + block.size > block.scene.width && block.y + block.size > block.scene.height) {
      block.scene.isFinished = true;
      await block.scene.save();
    }

    Queue.createJob(QueueTypes.NEW_IMAGE, { blockID: block.id, onWorkDone } as newImageProps)
      .attempts(3)
      .save((err: any) => err && console.error('An error occured while sending job.', err))
      .on('complete', () => onWorkDone(block.scene.id.toString()));

    console.debug('Received new block');

    return this.repository.save(block);
  }
};
