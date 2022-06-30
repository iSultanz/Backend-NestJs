import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Role } from "../../../constants/role.enum";
import { AbstractClass } from "./user-id.entity";
import { UserAvatar } from "../../user-avatar/entities/user-avatar.entity";
import { Task } from "../../tasks/entities/task.entity";


@Entity()
export class User extends AbstractClass {


    @Column({ default: Role.USER })
    roles: Role;

    @Column({ unique: true })
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

    @OneToOne(() => UserAvatar, ({ user }) => user)
    userAvatar: UserAvatar
}
