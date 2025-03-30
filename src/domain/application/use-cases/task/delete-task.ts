import { TaskRepository } from '../../repositories/task-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteTaskUseCase {
  constructor(readonly repository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    const task = await this.repository.getById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.repository.delete(id);
  }
}
