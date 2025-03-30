import { MedicineRepository } from '../../repositories/medicine-repository';
import { Medicine } from '../../../enterprise/entities/medicine';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllMedicinesUseCase {
  constructor(readonly repository: MedicineRepository) {}

  async execute(): Promise<Medicine[]> {
    return await this.repository.getAllMedicines();
  }
}
