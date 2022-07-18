import { Module } from '@nestjs/common';
import { UserAvatarService } from './service/user-avatar.service';
import { UserAvatarController } from './controller/user-avatar.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAvatar } from './entities/user-avatar.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserAvatar]),
    AuthModule],
  providers: [UserAvatarService],
  controllers: [UserAvatarController]
})
export class UserAvatarModule { }
