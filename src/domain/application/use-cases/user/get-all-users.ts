import { UserRepository } from '../../repositories/user-repository';
import { User } from '../../../enterprise/entities/user';

export class GetAllUsersUseCase {
  constructor(readonly repository: UserRepository) {}

  execute(): Promise<User[]> {
    return this.repository.getAllUsers();
  }
}
