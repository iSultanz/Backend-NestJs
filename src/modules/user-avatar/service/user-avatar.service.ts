import { BadRequestException, Inject, Injectable, NotFoundException, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isDefined, isMimeType, isUUID } from 'class-validator';
import { isNumber, isString } from 'lodash';
import { AuthService } from '../../auth/service/auth.service';
import { FileInterface, OptionArray } from '../type/user-avatar';
import { UserAvatar } from '../entities/user-avatar.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAvatarService {
    constructor(
        @InjectRepository(UserAvatar)
        private userAvatarRepository: Repository<UserAvatar>
    ) { }
        @Inject(AuthService)
        private authService: AuthService


    async getAvatarForUserWith(id: string) {
        if(!isUUID(id)){
            throw new NotFoundException('user not found!');
          }
        const user = await this.authService.userRepository.findOne({ id });
        if(!user){
            throw new NotFoundException('user not found!')
        }
        const avatar = await this.userAvatarRepository.findOne({ where: { 
            user
        }, relations: ['user'] })
        if(!avatar){
            throw new BadRequestException("User don't have avatar");
        }
        return avatar;  
            
    }

    async UploadAvatar(user_id: string, file: Express.Multer.File){
        const user = await this.authService.userRepository.findOne({ 
            where: { id: user_id } });
        if (!user) throw new BadRequestException('user not found!');

        if (!this._validateFile(file)){
            throw new BadRequestException('make sure to upload image..');
        }
        this._validateMimeType(file.mimetype,['image/png']);
        this._validateFileExtension(file.originalname.split('.').pop(),['png']);
        const newAvatarImage = this.userAvatarRepository.create({
            user,
            data: file.buffer,
            filename: file.originalname,
        });
        try{
            await this.userAvatarRepository.save(newAvatarImage);
        return {message:'image uploaded successfully'};
        }catch(err){
            console.log(err)
            throw new BadRequestException('error is here');
        }
    }

    private _validateFile(file: FileInterface): boolean {
        return (
            isDefined(file) &&
            isString(file.fieldname) &&
            isString(file.originalname) &&
            isNumber(file.size) &&
            isMimeType(file.mimetype) &&
            isString(file.encoding)
        );
    }

    private _validateMimeType(
        type: string,
        allowedTypes: OptionArray<string>,
    ): string {
        if (!allowedTypes.includes(type) && allowedTypes !== type) {
            console.log('_validateMimeType');
            throw new UnsupportedMediaTypeException();
        }
        return type;
    }


    private _validateFileExtension(
        fileNameExt: string,
        allowedTypes: OptionArray<string>,
    ): void {
        for (const allowed of allowedTypes) {
            if (allowed.includes(fileNameExt.toLowerCase())) {
                return;
            }
        }
        throw new UnsupportedMediaTypeException();
    }

}
