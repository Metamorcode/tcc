import { UserProps, UserRepository } from '../../repositories/user-repository';

export class UpdateUserUseCase {
  constructor(readonly repository: UserRepository) {}

  execute(props: UserProps) {
    this.repository.update(props);
  }
}
