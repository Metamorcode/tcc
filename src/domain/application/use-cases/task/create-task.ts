import { Injectable } from '@nestjs/common';
import { Task } from '../../../../domain/enterprise/entities/task';
import { TaskRepository } from '../../repositories/task-repository';
import { Category } from '../../../../domain/enterprise/entities/category';
import { CategoryDto } from '../../../../infrastructure/http/controllers/dto/category.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly repository: TaskRepository) {}

  async execute(
    description: string,
    eventTime: Date,
    categoryDto: CategoryDto,  
    repeatFor: number,
    completed: boolean,
    elderlyId: string,
    userId: string
  ): Promise<Task> {
    const category = new Category(
      categoryDto.id, 
      categoryDto.description,  
    );

    const task = new Task(
      description,
      eventTime,
      category,  
      repeatFor,
      completed,
      elderlyId,
      userId
    );

    return await this.repository.create(task);
  }
}
