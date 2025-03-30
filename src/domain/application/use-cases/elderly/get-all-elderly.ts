import { ElderlyRepository } from '../../repositories/elderly-repository';
import { Elderly } from '../../../enterprise/entities/elderly';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllElderlyUseCase {
  constructor(readonly repository: ElderlyRepository) {}

  async execute(): Promise<Elderly[]> {
    return this.repository.getAllElderly();
  }
}
