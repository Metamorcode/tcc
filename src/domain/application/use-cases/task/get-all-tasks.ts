import { TaskRepository } from '../../repositories/task-repository';
import { Task } from '../../../enterprise/entities/task';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllTasksUseCase {
  constructor(readonly repository: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return await this.repository.getAllTasks();
  }
}
