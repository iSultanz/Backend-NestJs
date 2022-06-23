import {IsString, MaxLength, MinLength } from "class-validator";

export class AuthSignIn{

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    

    @IsString()
    @MaxLength(32)
    password: string;

}