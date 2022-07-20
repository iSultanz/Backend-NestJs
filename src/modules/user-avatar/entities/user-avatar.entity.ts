import { AbstractClass } from "../../auth/entities/user-id.entity";
import { User } from "../../auth/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'UserAvatar' })
export class UserAvatar extends AbstractClass {

    @Column()
    @ApiProperty()
    filename: string;

    @Column({ type: 'bytea' })
    @ApiProperty()
    data: Buffer;

    @JoinColumn({ name: 'user_id' })
    @ApiProperty({type: User})
    @OneToOne(() => User, ({ userAvatar }) => userAvatar)
    user: User;


}