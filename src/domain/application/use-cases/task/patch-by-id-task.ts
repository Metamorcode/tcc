import { TaskProps, TaskRepository } from '../../repositories/task-repository';

export class PatchTaskUseCase {
  constructor(readonly repository: TaskRepository) {}

  execute(id: string, completed: boolean) {
    this.repository.patch(id, completed);
  }
}
