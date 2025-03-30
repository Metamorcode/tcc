import { UserRepository } from '../../repositories/user-repository';
import { User } from '../../../enterprise/entities/user';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GetByIdUserUseCase {
  constructor(readonly repository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.repository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
