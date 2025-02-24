import { ElderlyRepository } from '../../repositories/elderly-repository';
import { Elderly } from '../../../enterprise/entities/elderly';

export class GetAllElderlyUseCase {
  constructor(readonly repository: ElderlyRepository) {}

  execute(): Promise<Elderly[]> {
    return this.repository.getAllElderly();
  }
}
