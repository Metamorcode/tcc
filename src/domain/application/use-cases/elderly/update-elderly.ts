import { ElderlyProps, ElderlyRepository } from '../../repositories/elderly-repository';

export class UpdateElderlyUseCase {
  constructor(readonly repository: ElderlyRepository) {}

  execute(props: ElderlyProps) {
    this.repository.update(props);
  }
}
