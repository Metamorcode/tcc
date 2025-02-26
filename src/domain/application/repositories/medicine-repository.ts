import { Category } from 'src/domain/enterprise/entities/category';
import { Medicine } from 'src/domain/enterprise/entities/medicine';
import { MedicineUnit } from '../../enterprise/entities/medicine.unit';

export interface MedicineProps {
  id?: string;
  description: string;
  eventTime: Date;
  category: Category;
  repeatFor: number;
  completed: boolean;
  createdAt?: Date;
  elderlyId: string;
  name: string;
  quantity: number;
  unit: MedicineUnit;
}

export abstract class MedicineRepository {
  abstract create(props: MedicineProps): void;
  abstract delete(id: string): void;
  abstract update(props: MedicineProps): void;
  abstract getAllMedicines(): Promise<Medicine[]>;
  abstract getByCategory(category: string): Medicine[];
}
