import { User } from '../../../../domain/enterprise/entities/user';
import { UserRepository } from '../../repositories/user-repository';

export class CreateUserUseCase {
  constructor(readonly repository: UserRepository) {}

  execute(props: User) {
    this.repository.create(props);
  }
}
