import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
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

  @Mutation(returns => Block)
  async updateBlock(@Arg('id', type => Int) id: number, @Arg('data') data: string) {
    const block = await this.repository.findOne(id);

    if (block === undefined) {
      return undefined;
    }

    block.data = data;
    return this.repository.save(block);
  }
};
