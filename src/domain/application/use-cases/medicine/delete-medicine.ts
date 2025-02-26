import { MedicineRepository } from '../../repositories/medicine-repository';

export class DeleteMedicineUseCase {
  constructor(readonly repository: MedicineRepository) {}

  execute(id: string) {
    this.repository.delete(id);
  }
}
