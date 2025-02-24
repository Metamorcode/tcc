import { UserRepository } from '../../repositories/user-repository';
import { User } from '../../../enterprise/entities/user';

export class GetByNameUserUseCase {
  constructor(readonly repository: UserRepository) {}

  execute(firstName: string, lastName: string): User | null {
    return this.repository.getByName(firstName, lastName);
  }
}
