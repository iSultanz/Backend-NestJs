import { Task } from "src/modules/tasks/entities/task.entity"; 
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/constants/role.enum";  


@Entity()
export class User{


@PrimaryGeneratedColumn('uuid')
id:string;

@Column({default: Role.USER})
roles: Role;

@Column({unique: true})
username:string;

@Column()
password:string;

@OneToMany(() => Task, (task) => task.user, {eager: true})
tasks: Task[];
}