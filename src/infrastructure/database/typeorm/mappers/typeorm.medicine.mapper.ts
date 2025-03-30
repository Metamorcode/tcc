import { Medicine } from '../../../../domain/enterprise/entities/medicine';
import { MedicineEntity } from '../entities/medicine.entity';
import { TypeORMCategoryMapper } from './typeorm.category.mapper';
import { MedicineUnit } from '../../../../domain/enterprise/entities/medicine.unit';

export class TypeORMMedicineMapper {
  static toDomain(raw: MedicineEntity): Medicine {
    return new Medicine(
      raw.name,
      raw.quantity,
      raw.unit as MedicineUnit,
      raw.task.description,
      raw.task.eventTime,
      TypeORMCategoryMapper.toDomain(raw.task.category),
      raw.task.repeatFor,
      raw.task.completed,
      raw.task.elderly.id,
      raw.task.user.id
    );
  }

  static toTypeORM(medicine: Medicine): MedicineEntity {
    const medicineEntity = new MedicineEntity();
    medicineEntity.name = medicine.getName();
    medicineEntity.quantity = medicine.getQuantity();
    medicineEntity.unit = medicine.getUnit();
    medicineEntity.task.description = medicine.getDescription();
    medicineEntity.task.eventTime = medicine.getEventTime();
    medicineEntity.task.category = TypeORMCategoryMapper.toTypeORM(medicine.getCategory());
    medicineEntity.task.repeatFor = medicine.getRepeatFor();
    medicineEntity.task.completed = medicine.getCompleted();
    medicineEntity.task.elderly = { id: medicine.getElderlyId() } as any;
    medicineEntity.task.user = { id: medicine.getUserId() } as any;

    return medicineEntity;
  }
}
