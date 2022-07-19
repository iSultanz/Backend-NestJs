import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Role } from "../../../constants/role.enum";
import { AbstractClass } from "./user-id.entity";
import { UserAvatar } from "../../user-avatar/entities/user-avatar.entity";
import { Task } from "../../tasks/entities/task.entity";
import { ApiProperty} from '@nestjs/swagger'

@Entity()
export class User extends AbstractClass {

    @ApiProperty()
    @Column({ default: Role.USER })
    roles: Role;

    @ApiProperty()
    @Column({ unique: true })
    username: string;

    @ApiProperty()
    @Column()
    firstName: string;

    @ApiProperty()
    @Column()
    lastName: string;

    @ApiProperty()
    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

    @OneToOne(() => UserAvatar, ({ user }) => user)
    userAvatar: UserAvatar
}
