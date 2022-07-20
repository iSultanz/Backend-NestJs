import { IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class AuthSignIn {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    username: string;


    @IsString()
    @MaxLength(32)
    @ApiProperty()
    password: string;

}