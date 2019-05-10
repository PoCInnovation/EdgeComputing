import { Arg, Int, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Block from '../entities/Block';

@Resolver(of => Block)
export default class BlockResolver {
  constructor(@InjectRepository(Block) private readonly repository: Repository<Block>) {}

  @Query(returns => Block, { nullable: true })
  block(@Arg('id', type => Int) id: number) {
    return this.repository.findOne(id);
  }

  @Query(returns => [Block], { nullable: true })
  blocks() {
    return this.repository.find();
  }
};
