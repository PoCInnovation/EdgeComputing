import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Block {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    blockIndex!: number;

    @Column({ type: 'int8' })
    confirmations!: number;

    @Column()
    age!: number;

    @Column({ type: 'blob' })
    data!: Uint8Array;

};
