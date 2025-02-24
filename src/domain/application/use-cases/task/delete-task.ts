import { TaskRepository } from '../../repositories/task-repository';

export class DeleteTaskUseCase {
  constructor(readonly repository: TaskRepository) {}

  execute(id: string) {
    this.repository.delete(id);
  }
}
