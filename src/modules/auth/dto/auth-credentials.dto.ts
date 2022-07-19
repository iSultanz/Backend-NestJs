import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "../../../constants/role.enum";
import { ApiProperty } from '@nestjs/swagger';
export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    username: string;

    @IsString()
    @ApiProperty()
    firstName: string;

    @IsString()
    @ApiProperty()
    lastName: string;

    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is weak' })
    @ApiProperty()
    password: string;

    @IsEnum(Role)
    @ApiProperty()
    roles: Role;


}