import { IsString, IsOptional, IsNumber, IsEnum, IsDateString, IsBoolean } from 'class-validator';
import { MedicineUnit } from '../../../../domain/enterprise/entities/medicine.unit';
import { Category } from '../../../../domain/enterprise/entities/category';

export class UpdateMedicineDto {
  @IsString()
  name?: string;

  @IsNumber()
  quantity?: number;

  @IsEnum(MedicineUnit)
  unit?: MedicineUnit;

  @IsString()
  description?: string;

  @IsDateString()
  eventTime?: Date;

  @IsEnum(Category)
  category?: Category;

  @IsNumber()
  repeatFor?: number;

  @IsString()
  elderlyId?: string;

  @IsString()
  userId?: string;

  @IsBoolean()
  completed?: boolean;

  @IsDateString()
  createdAt?: Date;
}
