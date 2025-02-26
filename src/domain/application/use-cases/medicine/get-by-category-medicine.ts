import { MedicineProps, MedicineRepository } from '../../repositories/medicine-repository';
import { Medicine } from '../../../enterprise/entities/medicine';

export class GetByCategoryMedicineUseCase {
  constructor(readonly repository: MedicineRepository) {}

  execute(category: string): Medicine[] {
    return this.repository.getByCategory(category) || [];
  }
}
