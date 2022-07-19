import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
export class AbstractClass {
    @ApiProperty()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ApiProperty()
    @DeleteDateColumn({ name: 'deleted_at', default: null })
    deletedAt?: Date;

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;
}