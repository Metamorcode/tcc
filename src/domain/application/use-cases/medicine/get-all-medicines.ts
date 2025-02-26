import { MedicineRepository } from '../../repositories/medicine-repository';
import { Medicine } from '../../../enterprise/entities/medicine';

export class GetAllMedicinesUseCase {
  constructor(readonly repository: MedicineRepository) {}

  execute(): Promise<Medicine[]> {
    return this.repository.getAllMedicines();
  }
}
