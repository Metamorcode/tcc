import { ElderlyProps, ElderlyRepository } from '../../repositories/elderly-repository';

export class CreateElderlyUseCase {
  constructor(readonly repository: ElderlyRepository) {}

  execute(props: ElderlyProps) {
    this.repository.create(props);
  }
}
