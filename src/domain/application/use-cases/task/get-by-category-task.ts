import { TaskProps, TaskRepository } from '../../repositories/task-repository';
import { Task } from '../../../enterprise/entities/task';

export class GetByCategoryTaskUseCase {
  constructor(readonly repository: TaskRepository) {}

  execute(category: string): Task[] {
    return this.repository.getByCategory(category) || [];
  }
}
