import { IsEnum } from 'class-validator';
import { TaskStatus } from '../enum/tasks-status.enum';
import {ApiProperty} from '@nestjs/swagger'
export class UpdateTaskStatusDto {
    @ApiProperty()
    @IsEnum(TaskStatus)
    status: TaskStatus;

}