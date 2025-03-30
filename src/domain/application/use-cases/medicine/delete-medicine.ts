import { MedicineRepository } from '../../repositories/medicine-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteMedicineUseCase {
  constructor(readonly repository: MedicineRepository) {}

  async execute(id: string): Promise<void> {
    const medicine = await this.repository.getById(id);
    if (!medicine) {
      throw new NotFoundException('Medicine not found');
    }

    await this.repository.delete(id);
  }
}
