import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicineRepository } from '../../../../domain/application/repositories/medicine-repository';
import { Medicine } from '../../../../domain/enterprise/entities/medicine';
import { MedicineEntity } from '../entities/medicine.entity';
import { TypeORMMedicineMapper } from '../mappers/typeorm.medicine.mapper';

@Injectable()
export class TypeORMMedicineRepository implements MedicineRepository {
  constructor(
    @InjectRepository(MedicineEntity)
    private readonly repository: Repository<MedicineEntity>
  ) {}

  async create(medicineProps: Medicine): Promise<Medicine> {
    const medicineEntity = TypeORMMedicineMapper.toTypeORM(medicineProps);
    const savedMedicine = await this.repository.save(medicineEntity);
    return TypeORMMedicineMapper.toDomain(savedMedicine);
  }

  async getById(id: string): Promise<Medicine | null> {
    const medicineEntity = await this.repository.findOne({
      where: { id },
    });
    if (!medicineEntity) {
      return null;
    }
    return TypeORMMedicineMapper.toDomain(medicineEntity);
  }

  async update(medicine: Medicine): Promise<Medicine> {
    const medicineId = medicine.getId();

    if (!medicineId) {
      throw new Error('Medicine ID is required');
    }

    const existingMedicine = await this.repository.findOne({
      where: { id: medicineId },
    });

    if (!existingMedicine) {
      throw new Error('Medicine not found');
    }

    const medicineEntity = TypeORMMedicineMapper.toTypeORM(medicine);
    const updatedMedicine = await this.repository.save(medicineEntity);
    return TypeORMMedicineMapper.toDomain(updatedMedicine);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async getAllMedicines(): Promise<Medicine[]> {
    const medicineEntities = await this.repository.find();
    return medicineEntities.map(TypeORMMedicineMapper.toDomain);
  }
}
