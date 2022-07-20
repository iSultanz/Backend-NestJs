import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../enum/tasks-status.enum';
import { ApiProperty } from '@nestjs/swagger';
export class GetTaskFiliterDto {
    @IsOptional()
    @IsEnum(TaskStatus)

    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    search: string;

}