import { MedicineProps, MedicineRepository } from '../../repositories/medicine-repository';

export class UpdateMedicineUseCase {
  constructor(readonly repository: MedicineRepository) {}

  execute(props: MedicineProps) {
    this.repository.update(props);
  }
}
