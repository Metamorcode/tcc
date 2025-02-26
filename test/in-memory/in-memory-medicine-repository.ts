import {
  MedicineProps,
  MedicineRepository,
} from 'src/domain/application/repositories/medicine-repository';
import { Medicine } from '../../src/domain/enterprise/entities/medicine';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryMedicineRepository implements MedicineRepository {
  constructor() {}
  static medicines: Medicine[] = [];

  create({
    name,
    quantity,
    unit,
    description,
    eventTime,
    category,
    repeatFor,
    completed,
    elderlyId,
    id,
    createdAt,
  }: MedicineProps): void {
    const newId = id ? id : uuidv4();
    const medicine = new Medicine(
      name,
      quantity,
      unit,
      description,
      eventTime,
      category,
      repeatFor,
      completed,
      elderlyId,
      newId,
      createdAt,
    );
    InMemoryMedicineRepository.medicines.push(medicine);
  }

  update({
    name,
    quantity,
    unit,
    description,
    eventTime,
    category,
    repeatFor,
    completed,
    elderlyId,
    id,
    createdAt,
  }: MedicineProps): void {
    const medicine = new Medicine(
      name,
      quantity,
      unit,
      description,
      eventTime,
      category,
      repeatFor,
      completed,
      elderlyId,
      id,
      createdAt,
    );
    const medicineIndex = InMemoryMedicineRepository.medicines.findIndex((medicine) => {
      return medicine.getId() === id;
    });
    console.log(Medicine);
    InMemoryMedicineRepository.medicines[medicineIndex] = medicine;
  }

  delete(id: string): void {
    const medicineIndex = InMemoryMedicineRepository.medicines.findIndex((medicine) => {
      return medicine.getId() === id;
    });

    if (medicineIndex !== -1) {
      InMemoryMedicineRepository.medicines.splice(medicineIndex, 1);
    }
  }

  getAllMedicines(): Promise<Medicine[]> {
    return Promise.resolve(InMemoryMedicineRepository.medicines);
  }

  getByCategory(category: string): Medicine[] {
    return InMemoryMedicineRepository.medicines.filter((medicine) => {
      return medicine.getCategory().getDescription() === category;
    });
  }
}
