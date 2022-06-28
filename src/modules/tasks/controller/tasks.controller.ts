import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { getUser } from "src/decorators/get-user.decorator"; 
import { User } from "src/modules/auth/entities/user.entity"; 
import { CreateTaskDto } from "../dto/create-task.dto";
import { GetTaskFiliterDto } from "../dto/get-tasks-filiter.dto";
import { UpdateTaskStatusDto } from "../dto/update-task-status.dto";
import { Task } from "../entities/task.entity"; 
import { TasksService } from "../service/tasks.service"; 


@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('Task Controller');
  constructor(
    private tasksService: TasksService) { 
    }

  @Get()
  getTasks(@Query() filterDto: GetTaskFiliterDto,@getUser() user: User): Promise<Task[]> {
    this.logger.verbose(`User ${user.username} retreving all tasks Filter: ${JSON.stringify(filterDto)}`)
    return this.tasksService.getTasks(filterDto,user);
    }
  

  @Get('/:id')
  getTaskByID(@Param('id') id: string, @getUser() user: User) :Promise<Task>{
    return this.tasksService.getTaskByID(id,user);
  }
  @Delete('/:id')
  DeleteTaskByID(@Param('id') id:string, @getUser() user: User):Promise<void>{
    return this.tasksService.DeleteTaskByID(id,user);

  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto,
  @getUser() user: User): Promise<Task>{
    this.logger.verbose(`User ${user.username} creating a task : ${JSON.stringify(createTaskDto)}`)
    return this.tasksService.createTask(createTaskDto, user);
  }
  @Patch('/:id/status')
 async UpdateStatusByID(
    @Param('id') id:string,
    @Body() UpdateTaskStatusDto: UpdateTaskStatusDto,@getUser() user: User
  ):Promise<Task> {
    const {status} = UpdateTaskStatusDto; 
    return this.tasksService.UpdateStatusByID(id, status, user);
  }

}
