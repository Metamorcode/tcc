import { ElderlyRepository } from '../../repositories/elderly-repository';
import { Elderly } from '../../../enterprise/entities/elderly';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GetByIdElderlyUseCase {
  constructor(readonly repository: ElderlyRepository) {}

  async execute(id: string): Promise<Elderly | null> {
    const elderly = await this.repository.getById(id);
    if (!elderly) {
      throw new NotFoundException('Elderly not found');
    }
    return elderly;
  }
}
