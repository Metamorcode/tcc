import { Injectable } from '@nestjs/common';
import { ElderlyRepository } from '../../repositories/elderly-repository';
import { Elderly } from '../../../../domain/enterprise/entities/elderly'; // Certifique-se de importar o tipo Elderly

@Injectable()
export class CreateElderlyUseCase {
  constructor(private readonly repository: ElderlyRepository) {}

  async execute(
    firstName: string,
    lastName: string,
    birthDate: Date,
    userFamilyId: string
  ): Promise<Elderly> {
    const elderly = new Elderly(firstName, lastName, birthDate, userFamilyId);

    await this.repository.create(elderly);

    return elderly;
  }
}
