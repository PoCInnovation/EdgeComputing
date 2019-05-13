import { BLOCK_RENDER_TIME } from '@edge-computing/rendering';
import { EntityRepository, Repository } from 'typeorm';

import Block from '../entities/Block';
import { LessThanDate } from '../utils/Filters';

@EntityRepository(Block)
export default class BlockRepository extends Repository<Block> {
  getFreeBlock() {
    return this.findOne({
      where: {
        updatedAt: LessThanDate(new Date(Date.now() - BLOCK_RENDER_TIME)),
        data: null
      },
      relations: ['scene']
    });
  }
};
