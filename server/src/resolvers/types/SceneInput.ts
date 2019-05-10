import { Field, InputType, Int } from 'type-graphql';

@InputType()
export default class SceneInput {
  @Field()
  name!: string;

  @Field(type => Int)
  width!: number;

  @Field(type => Int)
  height!: number;

  @Field()
  config!: string;
};
