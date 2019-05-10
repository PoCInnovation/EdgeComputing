import { Field, InputType, Int } from 'type-graphql';

@InputType()
export default class BlockInput {
  @Field(type => Int)
  sceneId!: string;

  @Field(type => Int)
  blockIndex!: number;

  @Field()
  data!: string;
};
