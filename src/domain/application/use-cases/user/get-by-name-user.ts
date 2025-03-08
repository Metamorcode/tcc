import { UserRepository } from '../../repositories/user-repository';
import { User } from '../../../enterprise/entities/user';

export class GetByNameUserUseCase {
  constructor(readonly repository: UserRepository) {}

  async execute(firstName: string, lastName: string): Promise<User | null> {
    return await this.repository.getByName(firstName, lastName);
  }
}
