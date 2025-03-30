import { Elderly } from '../../../enterprise/entities/elderly';
import { ElderlyRepository } from '../../repositories/elderly-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateElderlyDto } from '../../../../infrastructure/http/controllers/dto/update-elderly-dto';

@Injectable()
export class UpdateElderlyUseCase {
  constructor(private readonly repository: ElderlyRepository) {}

  async execute(id: string, updateElderlyDto: UpdateElderlyDto): Promise<Elderly> {
    const elderly = await this.repository.getById(id);
    if (!elderly) {
      throw new NotFoundException('Elderly not found');
    }

    if (updateElderlyDto.firstName) {
      elderly.setFirstName(updateElderlyDto.firstName);
    }
    if (updateElderlyDto.lastName) {
      elderly.setLastName(updateElderlyDto.lastName);
    }
    if (updateElderlyDto.birthDate) {
      elderly.setBirthDate(new Date(updateElderlyDto.birthDate));
    }

    await this.repository.update(elderly);
    return elderly;
  }
}
