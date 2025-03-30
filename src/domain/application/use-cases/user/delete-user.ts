import { UserRepository } from '../../repositories/user-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
  constructor(readonly repository: UserRepository) {}

  async execute(id: string): Promise<void> {
    // Verificando se o usuário existe antes de deletar
    const user = await this.repository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Excluindo o usuário
    await this.repository.delete(id);
  }
}
