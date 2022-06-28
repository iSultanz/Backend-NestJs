import { Exclude } from "class-transformer";
import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export  class AbstractClass{
@Exclude()
@CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
@Exclude()
@UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
@Exclude()
@DeleteDateColumn({ name: 'deleted_at' ,default:null }) 'deleted_at': Date;
@PrimaryGeneratedColumn('uuid')
id:string;
}