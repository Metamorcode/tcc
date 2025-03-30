import { Injectable } from '@nestjs/common';
import { Medicine } from '../../../../domain/enterprise/entities/medicine';
import { MedicineRepository } from '../../repositories/medicine-repository';
import { Category } from '../../../../domain/enterprise/entities/category';
import { MedicineUnit } from '../../../../domain/enterprise/entities/medicine.unit';
import { CategoryDto } from '../../../../infrastructure/http/controllers/dto/category.dto';
@Injectable()
export class CreateMedicineUseCase {
  constructor(private readonly repository: MedicineRepository) {}

  async execute(
    name: string,
    quantity: number,
    unit: MedicineUnit,
    description: string,
    eventTime: Date,
    categoryDto: CategoryDto,  
    repeatFor: number,
    completed: boolean,
    elderlyId: string,
    userId: string,
    id?: string,
    createdAt?: Date
  ): Promise<Medicine> {
    const category = new Category(
      categoryDto.id, 
      categoryDto.description,  
    );
    
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
      userId,
      id,
      createdAt
    );

    return await this.repository.create(medicine);
  }
}
