import { TaskProps, TaskRepository } from '../../repositories/task-repository';

export class CreateTaskUseCase {
  constructor(readonly repository: TaskRepository) {}

  execute(props: TaskProps) {
    this.repository.create(props);
  }
}
