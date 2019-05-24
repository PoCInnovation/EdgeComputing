import { BLOCK_SIZE } from '@edge-computing/rendering';
import { EntityRepository, getCustomRepository, Repository } from 'typeorm';

import Block from '../entities/Block';
import Scene from '../entities/Scene';
import { sleep } from '../utils/Sleep';
import BlockRepository from './BlockRepository';


@EntityRepository(Scene)
export default class SceneRepository extends Repository<Scene> {
  private readonly blockRepository: BlockRepository;
  private searching: boolean = false;

  constructor() {
    super();
    this.blockRepository = getCustomRepository(BlockRepository);
  };

  async getNewBlock() {

    while (this.searching) {
      await sleep(50);
    }

    this.searching = true;
    const freeBlock = await this.blockRepository.getFreeBlock();

    if (freeBlock !== undefined) {
      this.searching = false;
      return freeBlock.save();
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

        this.searching = false;
        return newBlock.save();
      } else {

        scenes[i].blocks.sort((a, b) => b.id - a.id);
        const lastBlock = scenes[i].blocks[0];

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

          this.searching = false;
          return newBlock.save();
        }
      }
    }

    this.searching = false;
    return undefined;
  }
};
