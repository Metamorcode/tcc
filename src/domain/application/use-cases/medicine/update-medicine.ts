import { MedicineRepository } from '../../repositories/medicine-repository';
import { Medicine } from '../../../enterprise/entities/medicine';
import { UpdateMedicineDto } from '../../../../infrastructure/http/controllers/dto/update-medicine-dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateMedicineUseCase {
  constructor(private readonly repository: MedicineRepository) {}

  async execute(id: string, updateMedicineDto: UpdateMedicineDto): Promise<Medicine> {
    const medicine = await this.repository.getById(id);
    if (!medicine) {
      throw new NotFoundException('Medicine not found');
    }

    if (updateMedicineDto.name !== undefined) {
      medicine.setName(updateMedicineDto.name);
    }

    if (updateMedicineDto.quantity !== undefined) {
      medicine.setQuantity(updateMedicineDto.quantity);
    }

    if (updateMedicineDto.unit !== undefined) {
      medicine.setUnit(updateMedicineDto.unit);
    }

    if (updateMedicineDto.description !== undefined) {
      medicine.setDescription(updateMedicineDto.description);
    }

    if (updateMedicineDto.eventTime !== undefined) {
      medicine.setEventTime(updateMedicineDto.eventTime);
    }

    if (updateMedicineDto.repeatFor !== undefined) {
      medicine.setRepeatFor(updateMedicineDto.repeatFor);
    }

    if (updateMedicineDto.completed !== undefined) {
      medicine.setCompleted(updateMedicineDto.completed);
    }

    if (updateMedicineDto.category !== undefined) {
      medicine.setCategory(updateMedicineDto.category);
    }

    if (updateMedicineDto.userId !== undefined) {
      medicine.setUserId(updateMedicineDto.userId);
    }   

    if (updateMedicineDto.elderlyId !== undefined) {
      medicine.setElderlyId(updateMedicineDto.elderlyId);
    }

    await this.repository.update(medicine);

    return medicine;
  }
}
