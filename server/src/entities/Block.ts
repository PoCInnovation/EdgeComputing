import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export default class Block extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(type => Int)
  @Column()
  blockIndex!: number;

  @Field(type => Int)
  @Column({ type: 'int8', default: 1 })
  confirmations!: number;

  @Field()
  @Column({ type: 'blob' })
  data!: string;
};
