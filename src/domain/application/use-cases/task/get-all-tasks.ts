import { TaskRepository } from '../../repositories/task-repository';
import { Task } from '../../../enterprise/entities/task';

export class GetAllTasksUseCase {
  constructor(readonly repository: TaskRepository) {}

  execute(): Promise<Task[]> {
    return this.repository.getAllTasks();
  }
}
