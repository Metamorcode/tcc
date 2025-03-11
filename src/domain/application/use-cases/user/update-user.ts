import { User } from '../../../../domain/enterprise/entities/user';
import { UserRepository } from '../../repositories/user-repository';

export class UpdateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(user: User): Promise<void> {
    await this.repository.update(user); 
  }
}
