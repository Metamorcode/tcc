import { Medicine } from '../../..//domain/enterprise/entities/medicine';

export abstract class MedicineRepository {
  abstract create(medicine: Medicine): Promise<Medicine>;
  abstract delete(id: string): Promise<boolean>;
  abstract update(medicine: Medicine): Promise<Medicine>;
  abstract getAllMedicines(): Promise<Medicine[]>;
  abstract getById(id: string): Promise<Medicine | null>;
}
