import { IsOptional, IsString } from "class-validator";

export class UpdateInformationDto {


    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    email: string;
}