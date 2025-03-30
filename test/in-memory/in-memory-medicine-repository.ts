import { Medicine } from '../../src/domain/enterprise/entities/medicine';
import { MedicineRepository } from 'src/domain/application/repositories/medicine-repository';
import { NotFoundException } from '@nestjs/common';

export class InMemoryMedicineRepository implements MedicineRepository {
  private medicines: Medicine[] = [];

  async create(medicine: Medicine): Promise<Medicine> {
    this.medicines.push(medicine);
    return medicine;
  }

  async update(medicine: Medicine): Promise<Medicine> {
    const medicineIndex = this.medicines.findIndex((m) => m.getMedicineId() === medicine.getMedicineId());

    if (medicineIndex === -1) {
      throw new NotFoundException('Medicine not found');
    }

    this.medicines[medicineIndex] = medicine;
    return medicine;
  }

  async delete(id: string): Promise<boolean> {
    const medicineIndex = this.medicines.findIndex((medicine) => medicine.getMedicineId() === id);
    if (medicineIndex === -1) {
      throw new NotFoundException('Medicine not found');
    }
    this.medicines.splice(medicineIndex, 1);
    return true;
  }

  async getById(id: string): Promise<Medicine | null> {
    const medicine = this.medicines.find((medicine) => medicine.getMedicineId() === id);
    return medicine || null;
  }

  async getAllMedicines(): Promise<Medicine[]> {
    return this.medicines;
  }

  async patch(id: string, completed: boolean): Promise<boolean> {
    const medicine = this.medicines.find((medicine) => medicine.getMedicineId() === id);
    if (!medicine) {
      return false;
    }
    medicine.setCompleted(completed);
    return true;
  }

  reset(): void {
    this.medicines = [];
  }
}
