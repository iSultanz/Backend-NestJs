import { Exclude } from "class-transformer";
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class AbstractClass {

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;


    @DeleteDateColumn({ name: 'deleted_at', default: null })
    deletedAt?: Date;

    @PrimaryGeneratedColumn('uuid')
    id: string;
}