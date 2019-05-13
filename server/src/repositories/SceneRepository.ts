import { BLOCK_SIZE } from '@edge-computing/rendering';
import { EntityRepository, getCustomRepository, Repository } from 'typeorm';

import Block from '../entities/Block';
import Scene from '../entities/Scene';
import BlockRepository from './BlockRepository';

@EntityRepository(Scene)
export default class SceneRepository extends Repository<Scene> {
  private readonly blockRepository: BlockRepository;

  constructor() {
    super();
    this.blockRepository = getCustomRepository(BlockRepository);
  };

  async getNewBlock() {
    const freeBlock = await this.blockRepository.getFreeBlock();

    if (freeBlock !== undefined) {
      return freeBlock;
    }

    const scenes = await this.find({
      where: {
        isFinished: false
      },
      relations: ['blocks']
    });

    for (let i = 0; i < scenes.length; i++) {
      if (scenes[i].blocks.length === 0) {
        const newBlock = new Block();
        newBlock.size = BLOCK_SIZE;
        newBlock.x = 0;
        newBlock.y = 0;
        newBlock.scene = scenes[i];
        return newBlock.save();
      } else {
        const lastBlock = scenes[i].blocks[scenes[i].blocks.length - 1];
        if (lastBlock.x + lastBlock.size < scenes[i].width || lastBlock.y + lastBlock.size < scenes[i].height) {
          const newBlock = new Block();
          newBlock.size = BLOCK_SIZE;
          newBlock.x = lastBlock.x + lastBlock.size;
          newBlock.y = lastBlock.y;
          if (newBlock.x >= scenes[i].width) {
            newBlock.x = 0;
            newBlock.y = lastBlock.y + lastBlock.size;
          }
          newBlock.scene = scenes[i];
          return newBlock.save();
        }
      }
    }

    return undefined;
  }
};
