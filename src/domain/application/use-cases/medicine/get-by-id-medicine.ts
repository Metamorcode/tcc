import { MedicineRepository } from '../../repositories/medicine-repository';
import { Medicine } from '../../../enterprise/entities/medicine';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GetByIdMedicineUseCase {
  constructor(readonly repository: MedicineRepository) {}

  async execute(id: string): Promise<Medicine | null> {
    const medicine = await this.repository.getById(id);
    if (!medicine) {
      throw new NotFoundException('Medicine not found');
    }
    return medicine;
  }
}
