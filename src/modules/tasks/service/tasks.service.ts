import {  Injectable, NotFoundException, Logger, InternalServerErrorException } from "@nestjs/common";
import { TaskStatus } from "../enum/tasks-status.enum"; 
import { CreateTaskDto } from "../dto/create-task.dto";
import { GetTaskFiliterDto } from "../dto/get-tasks-filiter.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entities/task.entity"; 
import { Repository } from "typeorm";
import { User } from "src/modules/auth/entities/user.entity"; 

@Injectable()
export class TasksService {
  private logger = new Logger('TaskService');
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }


  async getTasks(filter: GetTaskFiliterDto, user: User): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user });
    const { status, search } = filter;


    if (status) {
      query.andWhere('task.status = :status', { status });
    }


    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` }
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to get tasks for user ${user.username} Filter: ${JSON.stringify(filter)}`,error.stack,);
      throw new InternalServerErrorException();
    }
  }

  async getTaskByID(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    } return found;
  }

  async DeleteTaskByID(id: string, user: User): Promise<void> {
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user });
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" Not found`);
    }
  }

  async UpdateStatusByID(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = this.getTaskByID(id, user);
    await this.taskRepository.createQueryBuilder()
      .update(Task)
      .set({ status: status })
      .where({ id })
      .execute()
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.taskRepository.save(task);
    return task;
  }
}