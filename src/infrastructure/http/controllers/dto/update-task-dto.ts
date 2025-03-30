import { IsString, IsDate, IsBoolean, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { Category } from '../../../../domain/enterprise/entities/category';

export class UpdateTaskDto {
  @IsString()
  description?: string;

  @IsDate()
  eventTime?: Date;

  @IsEnum(Category)
  category?: Category;

  @IsNumber()
  repeatFor?: number;

  @IsBoolean()
  completed?: boolean;

  @IsString()
  elderlyId?: string;

  @IsString()
  userId?: string;
}
