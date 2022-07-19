import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class UpdateInformationDto {


    @IsString()
    @IsOptional()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    lastName: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    email: string;
}