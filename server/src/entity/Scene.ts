import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import Block from './Block';

@Entity()
export default class Scene {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    width!: number;

    @Column()
    height!: number;

    @Column({ type: 'blob' })
    config!: string;

    @Column({ default: false })
    isFinished!: boolean;

    @ManyToMany(type => Block)
    blocks!: Block[];

};
