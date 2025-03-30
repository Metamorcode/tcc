import { TaskRepository } from '../../repositories/task-repository';
import { Task } from '../../../enterprise/entities/task';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GetByIdTaskUseCase {
  constructor(readonly repository: TaskRepository) {}

  async execute(id: string): Promise<Task | null> {
    const task = await this.repository.getById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
}
