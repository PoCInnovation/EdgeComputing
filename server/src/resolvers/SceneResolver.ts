import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import Scene from '../entities/Scene';
import { ContextInterface } from '../interfaces/Context';
import SceneRepository from '../repositories/SceneRepository';
import SceneInput from './types/SceneInput';

@Resolver(of => Scene)
export default class SceneResolver {
  constructor(@InjectRepository(SceneRepository) private readonly repository: SceneRepository) {}

  @Query(returns => Scene, { nullable: true })
  scene(@Arg('id', type => Int) id: number) {
    return this.repository.findOne(id);
  }

  @Query(returns => [Scene], { nullable: true })
  scenes() {
    return this.repository.find();
  }

  @Mutation(returns => Scene)
  async newScene(@Arg('scene') input: SceneInput, @Ctx() { onUpload }: ContextInterface) {
    const scene = this.repository.create({
      ...input
    });

    await this.repository.save(scene);

    onUpload(this.repository.getId(scene));

    return scene;
  }
};
