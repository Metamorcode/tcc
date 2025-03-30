import { ElderlyRepository } from '../../repositories/elderly-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteElderlyUseCase {
  constructor(readonly repository: ElderlyRepository) {}

  async execute(id: string): Promise<void> {
    // Verificando se o idoso existe antes de deletar
    const elderly = await this.repository.getById(id);
    if (!elderly) {
      throw new NotFoundException('Elderly not found');
    }

    // Excluindo o idoso
    await this.repository.delete(id);
  }
}
