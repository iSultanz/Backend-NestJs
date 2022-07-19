import { Exclude } from 'class-transformer';
import { AbstractClass } from '../../auth/entities/user-id.entity';
import { User } from '../../auth/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { TaskStatus } from '../enum/tasks-status.enum';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Task extends AbstractClass {
    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    status: TaskStatus;

    @ApiProperty({type: User})
    @ManyToOne(() => User, (user) => user.tasks)
    @Exclude()
    user: User;
}