import { UserRepository } from '../../repositories/user-repository';

export class DeleteUserUseCase {
  constructor(readonly repository: UserRepository) {}

  execute(id: string) {
    this.repository.delete(id);
  }
}
