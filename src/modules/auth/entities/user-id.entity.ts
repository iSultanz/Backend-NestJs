import { Exclude } from "class-transformer";
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class AbstractClass {
    @Exclude()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Exclude()
    @DeleteDateColumn({ name: 'deleted_at', default: null })
    deletedAt?: Date;

    @PrimaryGeneratedColumn('uuid')
    id: string;
}