import { Task } from "src/modules/tasks/entities/task.entity"; 
import { Column, Entity, OneToMany } from "typeorm";
import { Role } from "src/constants/role.enum";  
import { AbstractClass } from "./user-id.entity";


@Entity()
export class User extends AbstractClass{


@Column({default: Role.USER})
roles: Role;

@Column({unique: true})
username:string;

@Column()
firstName: string;

@Column()
lastName: string;

@Column()
email: string;

@Column()
password:string;


@OneToMany(() => Task, (task) => task.user, {eager: true})
tasks: Task[];
}