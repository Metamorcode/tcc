import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../../../../domain/application/repositories/task-repository';
import { Task } from '../../../../domain/enterprise/entities/task';
import { TaskEntity } from '../entities/task.entity';
import { TypeORMTaskMapper } from '../mappers/typeorm.task.mapper';

@Injectable()
export class TypeORMTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repository: Repository<TaskEntity>
  ) {}

  async create(task: Task): Promise<Task> {
    const taskEntity = TypeORMTaskMapper.toTypeORM(task);
    const savedTask = await this.repository.save(taskEntity);
    return TypeORMTaskMapper.toDomain(savedTask);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async update(task: Task): Promise<Task> {
    const taskEntity = TypeORMTaskMapper.toTypeORM(task);
    const updatedTask = await this.repository.save(taskEntity);
    return TypeORMTaskMapper.toDomain(updatedTask);
  }

  async patch(id: string, completed: boolean): Promise<boolean> {
    const result = await this.repository.update(id, { completed });
    return (result.affected ?? 0) > 0;
  }

  async getById(id: string): Promise<Task | null> {
    const taskEntity = await this.repository.findOne({ where: { id } });
    return taskEntity ? TypeORMTaskMapper.toDomain(taskEntity) : null;
  }

  async getAllTasks(): Promise<Task[]> {
    const taskEntities = await this.repository.find();
    return taskEntities.map(TypeORMTaskMapper.toDomain);
  }
}
