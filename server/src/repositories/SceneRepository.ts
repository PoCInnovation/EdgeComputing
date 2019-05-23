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
      return freeBlock.save();
    }

    const scenes = await this.find({
      where: {
        isFinished: false
      },
      relations: ['blocks']
    });


    for (let i = 0; i < scenes.length; i++) {
      console.log(scenes[i].blocks[0].id);
      if (scenes[i].blocks.length === 0) {
        const newBlock = new Block();
        newBlock.size = BLOCK_SIZE;
        newBlock.x = 0;
        newBlock.y = 0;
        newBlock.scene = scenes[i];
        return newBlock.save();
      } else {
        scenes[i].blocks.sort((a, b) => b.id - a.id);
        const lastBlock = scenes[i].blocks[0];
        console.log('LastBlock is:', lastBlock.id, 'x:', lastBlock.x, 'y:', lastBlock.y);

        if (lastBlock.x + lastBlock.size < scenes[i].width || lastBlock.y + lastBlock.size < scenes[i].height) {
          const newBlock = new Block();
          newBlock.size = BLOCK_SIZE;
          newBlock.x = lastBlock.x + lastBlock.size;
          newBlock.y = lastBlock.y;
          if (newBlock.x >= scenes[i].width) {
            newBlock.x = 0;
            newBlock.y += lastBlock.size;
          }
          newBlock.scene = scenes[i];
          return newBlock.save();
        }
      }
    }

    return undefined;
  }
};
