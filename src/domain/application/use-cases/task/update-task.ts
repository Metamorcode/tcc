import { TaskRepository } from '../../repositories/task-repository';
import { Task } from '../../../enterprise/entities/task';
import { UpdateTaskDto } from '../../../../infrastructure/http/controllers/dto/update-task-dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly repository: TaskRepository) {}

  async execute(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.repository.getById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (updateTaskDto.description !== undefined) {
      task.setDescription(updateTaskDto.description);
    }

    if (updateTaskDto.eventTime !== undefined) {
      task.setEventTime(updateTaskDto.eventTime);
    }

    if (updateTaskDto.category !== undefined) {
      task.setCategory(updateTaskDto.category);
    }

    if (updateTaskDto.repeatFor !== undefined) {
      task.setRepeatFor(updateTaskDto.repeatFor);
    }

    if (updateTaskDto.completed !== undefined) {
      task.setCompleted(updateTaskDto.completed);
    }

    if (updateTaskDto.elderlyId !== undefined) {
      task.setElderlyId(updateTaskDto.elderlyId);
    }

    if (updateTaskDto.userId !== undefined) {
      task.setUserId(updateTaskDto.userId); 
    }

    await this.repository.update(task);

    return task;
  }
}
