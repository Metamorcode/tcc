import { ElderlyProps, ElderlyRepository } from '../../repositories/elderly-repository';

export class DeleteElderlyUseCase {
  constructor(readonly repository: ElderlyRepository) {}

  execute(id: string) {
    this.repository.delete(id);
  }
}
