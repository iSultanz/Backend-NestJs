import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "../../../constants/role.enum";

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is weak' })
    password: string;

    @IsEnum(Role)
    roles: Role;


}