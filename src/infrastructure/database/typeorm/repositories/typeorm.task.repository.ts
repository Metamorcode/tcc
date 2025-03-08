import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  TaskProps,
  TaskRepository,
} from '../../../../domain/application/repositories/task-repository';
import { Task } from '../../../../domain/enterprise/entities/task';
import { TaskEntity } from '../entities/task.entity';
import { TypeORMTaskMapper } from '../mappers/typeorm.task.mapper';

@Injectable()
export class TypeORMTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repository: Repository<TaskEntity>
  ) {}
  create(props: Task): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): void {
    throw new Error('Method not implemented.');
  }
  update(props: TaskProps): void {
    throw new Error('Method not implemented.');
  }
  patch(id: string, completed: boolean): void {
    throw new Error('Method not implemented.');
  }
  getAllTasks(): Promise<Task[]> {
    throw new Error('Method not implemented.');
  }
  getByCategory(category: string): Task[] {
    throw new Error('Method not implemented.');
  }

  // async create(task: Task): Promise<void> {
  //   const taskEntity = TypeORMTaskMapper.toTypeORM(task);
  //   await this.repository.save(taskEntity);
  // }

  // async findById(id: string): Promise<Task | null> {
  //   const TaskEntity = await this.repository.findOne({
  //     where: { id },
  //     relations: ['tasks'],
  //   });

  //   if (!TaskEntity) {
  //     return null;
  //   }

  //   return TypeORMTaskMapper.toDomain(TaskEntity);
  // }

  // async findAll(): Promise<Task[]> {
  //   const TaskEntities = await this.repository.find({
  //     relations: ['tasks'],
  //   });

  //   return TaskEntities.map(TypeORMTaskMapper.toDomain);
  // }

  // async findByEmail(email: string): Promise<Task | null> {
  //   const TaskEntity = await this.repository.findOne({
  //     where: { email },
  //   });

  //   if (!TaskEntity) {
  //     return null;
  //   }

  //   return TypeORMTaskMapper.toDomain(TaskEntity);
  // }

  // async update(Task: Task): Promise<void> {
  //   const TaskEntity = TypeORMTaskMapper.toTypeORM(Task);
  //   await this.repository.save(TaskEntity);
  // }

  // async delete(id: string): Promise<void> {
  //   await this.repository.delete(id);
  // }

  // // Implementando os métodos ausentes:
  // async getByName(firstName: string, lastName: string): Promise<Task | null> {
  //   const TaskEntity = await this.repository.findOne({
  //     where: { firstName, lastName },
  //   });

  //   if (!TaskEntity) {
  //     return null;
  //   }

  //   return TypeORMTaskMapper.toDomain(TaskEntity);
  // }

  // async getAllTasks(): Promise<Task[]> {
  //   const TaskEntities = await this.repository.find();
  //   return TaskEntities.map(TypeORMTaskMapper.toDomain);
  // }
}
