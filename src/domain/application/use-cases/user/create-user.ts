import { Injectable } from '@nestjs/common';
import { User } from '../../../../domain/enterprise/entities/user';
import { UserRepository } from '../../repositories/user-repository';
import { UserRoles } from '../../../../domain/enterprise/entities/user.role';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(
    firstName: string,
    lastName: string,
    email: string,
    login: string,
    password: string,
    role: UserRoles
  ): Promise<User> {
    const user = new User(firstName, lastName, email, login, password, role);
    await this.repository.create(user);
    return user;
  }
}
