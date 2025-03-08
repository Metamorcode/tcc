import { Task } from '../../../../domain/enterprise/entities/task';
import { TaskRepository } from '../../repositories/task-repository';

export class CreateTaskUseCase {
  constructor(readonly repository: TaskRepository) {}

  execute(props: Task) {
    this.repository.create(props);
  }
}
