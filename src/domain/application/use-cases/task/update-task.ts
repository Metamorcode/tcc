import { TaskProps, TaskRepository } from '../../repositories/task-repository';

export class UpdateTaskUseCase {
  constructor(readonly repository: TaskRepository) {}

  execute(props: TaskProps) {
    this.repository.update(props);
  }
}
