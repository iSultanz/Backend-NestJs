import { AbstractClass } from "../../auth/entities/user-id.entity";
import { User } from "../../auth/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity({ name: 'UserAvatar' })
export class UserAvatar extends AbstractClass {

    @Column()
    filename: string;

    @Column({ type: 'bytea' })
    data: Buffer;

    @JoinColumn({ name: 'user_id' })
    @OneToOne(() => User, ({ userAvatar }) => userAvatar)
    user: User;


}