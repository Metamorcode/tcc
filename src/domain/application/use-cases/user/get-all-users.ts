import { UserRepository } from '../../repositories/user-repository';
import { User } from '../../../enterprise/entities/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllUsersUseCase {
  constructor(readonly repository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.repository.getAllUsers();
  }
}
