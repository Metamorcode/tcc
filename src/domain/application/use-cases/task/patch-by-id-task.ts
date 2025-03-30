import { TaskRepository } from '../../repositories/task-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PatchTaskUseCase {
  constructor(readonly repository: TaskRepository) {}

  async execute(id: string, completed: boolean): Promise<void> {
    const task = await this.repository.getById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.repository.patch(id, completed);
  }
}
