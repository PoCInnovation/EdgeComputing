import { SceneInterface } from '@edge-computing/interfaces';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import Block from './Block';

@Entity()
@ObjectType()
export default class Scene extends BaseEntity implements SceneInterface {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(type => Int)
  @Column()
  width!: number;

  @Field(type => Int)
  @Column()
  height!: number;

  @Field()
  @Column({ type: 'blob' })
  config!: string;

  @Field(type => Boolean)
  @Column({ default: false })
  isFinished!: boolean;

  @OneToMany(type => Block, block => block.scene)
  blocks!: Block[];

  @Field(type => Date)
  @CreateDateColumn({type: 'datetime'})
  createdAt!: Date;

  @Field(type => Date)
  @UpdateDateColumn({type: 'datetime'})
  updatedAt!: Date;
};
