import { UserProps, UserRepository } from '../../repositories/user-repository';

export class CreateUserUseCase {
  constructor(readonly repository: UserRepository) {}

  execute(props: UserProps) {
    this.repository.create(props);
  }
}
