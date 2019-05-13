import { BlockInterface } from '@edge-computing/interfaces';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import Scene from './Scene';

@Entity()
@ObjectType()
export default class Block extends BaseEntity implements BlockInterface {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(type => Int)
  @Column()
  size!: number;

  @Field(type => Int)
  @Column()
  x!: number;

  @Field(type => Int)
  @Column()
  y!: number;

  @Field(type => Date)
  @UpdateDateColumn({type: 'datetime'})
  updatedAt!: Date;

  @Field(type => Int)
  @Column({ type: 'int8', default: 1 })
  confirmations!: number;

  @Field()
  @Column({ type: 'blob', nullable: true })
  data!: string;

  @ManyToOne(type => Scene, scene => scene.blocks)
  scene!: Scene;
};
