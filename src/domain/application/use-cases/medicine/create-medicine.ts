import { MedicineProps, MedicineRepository } from '../../repositories/medicine-repository';

export class CreateMedicineUseCase {
  constructor(readonly repository: MedicineRepository) {}

  execute(props: MedicineProps) {
    this.repository.create(props);
  }
}
