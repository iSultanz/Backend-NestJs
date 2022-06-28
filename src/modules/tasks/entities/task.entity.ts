import { Exclude } from 'class-transformer';
import { AbstractClass } from 'src/modules/auth/entities/user-id.entity';
import { User } from 'src/modules/auth/entities/user.entity'; 
import { Column, Entity, ManyToOne } from 'typeorm';
import { TaskStatus } from '../enum/tasks-status.enum'; 
@Entity()
export class Task extends AbstractClass{
    
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne( () => User, (user) => user.tasks, {eager: false})
    @Exclude()
    user: User;
}