import { MedicineEntity } from '../entities/medicine.entity';
import { Medicine } from '../../../../domain/enterprise/entities/medicine';
import { TypeORMTaskMapper } from './typeorm.task.mapper';

export class TypeORMMedicineMapper {
  // static toDomain(raw: MedicineEntity): Medicine {
  //   const medicine = new Medicine({
  //     id: raw.id,
  //     description: raw.description,
  //     eventTime: raw.eventTime,
  //     category: raw.category,
  //     repeatFor: raw.repeatFor,
  //     completed: raw.completed,
  //     elderly: raw.elderly,
  //     user: raw.user,
  //     name: raw.name,
  //     quantity: raw.quantity,
  //     unit: raw.unit,
  //   });
  //   return medicine;
  // }
  // static toTypeORM(medicine: Medicine): MedicineEntity {
  //   const medicineEntity = new MedicineEntity();
  //   medicineEntity.id = medicine.id;
  //   medicineEntity.description = medicine.description;
  //   medicineEntity.eventTime = medicine.eventTime;
  //   medicineEntity.category = medicine.category;
  //   medicineEntity.repeatFor = medicine.repeatFor;
  //   medicineEntity.completed = medicine.completed;
  //   medicineEntity.elderly = medicine.elderly;
  //   medicineEntity.user = medicine.user;
  //   medicineEntity.name = medicine.name;
  //   medicineEntity.quantity = medicine.quantity;
  //   medicineEntity.unit = medicine.unit;
  //   return medicineEntity;
  // }
}
