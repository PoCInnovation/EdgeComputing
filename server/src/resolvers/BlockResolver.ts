import { Arg, Int, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Block from '../entities/Block';
import Scene from '../entities/Scene';

@Resolver(of => Block)
export default class BlockResolver {
  constructor(
    @InjectRepository(Block) private readonly repository: Repository<Block>,
    @InjectRepository(Scene) private readonly sceneRepository: Repository<Scene>
  ) {}

  @Query(returns => Block, { nullable: true })
  block(@Arg('id', type => Int) id: number) {
    return this.repository.findOne(id);
  }

  @Query(returns => [Block], { nullable: true })
  blocks() {
    return this.repository.find();
  }
};
