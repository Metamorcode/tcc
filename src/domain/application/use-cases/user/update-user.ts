import { UserRepository } from '../../repositories/user-repository';
import { User } from '../../../enterprise/entities/user'; // Importando o DTO
import { UpdateUserDto } from '../../../../infrastructure/http/controllers/dto/update-user-dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.repository.getById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Condicional para verificar se os dados estão presentes antes de atualizar
    if (updateUserDto.firstName) {
      user.setFirstName(updateUserDto.firstName);
    }
    if (updateUserDto.lastName) {
      user.setLastName(updateUserDto.lastName);
    }
    if (updateUserDto.email) {
      user.setEmail(updateUserDto.email);
    }
    if (updateUserDto.login) {
      user.setLogin(updateUserDto.login);
    }
    if (updateUserDto.password) {
      user.setPassword(updateUserDto.password);
    }
    if (updateUserDto.role) {
      user.setRole(updateUserDto.role);
    }

    await this.repository.update(user);
    return user;
  }
}
