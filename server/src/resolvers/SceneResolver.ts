import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Scene from '../entities/Scene';
import SceneInput from './types/SceneInput';

@Resolver(of => Scene)
export default class SceneResolver {
  constructor(@InjectRepository(Scene) private readonly repository: Repository<Scene>) {}

  @Query(returns => Scene, { nullable: true })
  scene(@Arg('id', type => Int) id: number) {
    return this.repository.findOne(id);
  }

  @Query(returns => [Scene], { nullable: true })
  scenes() {
    return this.repository.find();
  }

  @Mutation(returns => Scene)
  newScene(@Arg('scene') input: SceneInput) {
    const scene = this.repository.create({
      ...input
    });

    return this.repository.save(scene);
  }
};
