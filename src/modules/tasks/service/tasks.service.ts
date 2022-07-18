import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { Repository } from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { CreateTaskDto } from "../dto/create-task.dto";
import { GetTaskFiliterDto } from "../dto/get-tasks-filiter.dto";
import { Task } from "../entities/task.entity";
import { TaskStatus } from "../enum/tasks-status.enum";

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
      const tasks = await query.select(['task.title', 'task.description', 'task.status']).getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to get tasks for user ${user.username} Filter: ${JSON.stringify(filter)}`, error.stack,);
      throw new InternalServerErrorException();
    }
  }

  async getTaskByID(id: string, user: User): Promise<Task> {
    if(!isUUID(id)){
      throw new NotFoundException(`Task with ID "${id}" Not found`)
    }
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
    const task = await this.getTaskByID(id, user);
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
    delete task.user;
    return task;
  }
  async deleteUserTaskByAdmin(id: string): Promise<string> {

    const found = await this.taskRepository.findOne({ where: { id } })

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" Not found`);
    }
    await this.taskRepository.update(id, { deletedAt: new Date });

    return 'task deleted successfully';

  }

}