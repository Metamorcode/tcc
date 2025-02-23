import { ElderlyRepository } from '../../repositories/elderly-repository';
import { Elderly } from '../../../enterprise/entities/Elderly';

export class GetByNameElderlyUseCase {
  constructor(readonly repository: ElderlyRepository) {}

  execute(firstName: string, lastName: string): Elderly | null {
    return this.repository.getByName(firstName, lastName);
  }
}
