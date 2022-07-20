import { Controller, Get, Param, Post, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { UserAvatarService } from '../service/user-avatar.service';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('UserAvatar')

@Controller('user-avatar')
@UseGuards(AuthGuard())
export class UserAvatarController {
    constructor(
        private userAvatarService: UserAvatarService) {
    }

    @Post('/upload/:user_id')
    @UseInterceptors(FileInterceptor('file'))
    async UploadAvatar(@Param('user_id') user_id: string, @UploadedFile() file: Express.Multer.File,
    ) {
        const result = await this.userAvatarService.UploadAvatar(user_id, file);
        return result;

    }

    @Get(':id')
    async getAvatarForUserWith(@Param('id') id: string) {
        const userAvatar = await this.userAvatarService.getAvatarForUserWith(id)
        const readableStream = Readable.from(userAvatar.data);

        return new StreamableFile(readableStream, {
            disposition: `filename: ${userAvatar.user.id}-avatar.png`,
            type: 'image/png'
        })
    }

}
