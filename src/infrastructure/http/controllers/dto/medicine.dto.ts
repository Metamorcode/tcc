
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, IsUUID, IsEnum } from 'class-validator';
import { CategoryDto } from './category.dto'; 
import { MedicineUnit } from '../../../../domain/enterprise/entities/medicine.unit'; 

export class MedicineDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the medicine', example: 'Aspirin' })
  name: string;

  @IsNumber()
  @ApiProperty({ description: 'The quantity of the medicine', example: 2 })
  quantity: number;

  @IsEnum(MedicineUnit) 
  @ApiProperty({ description: 'The unit of the medicine', example: 'comprimidos' })
  unit: MedicineUnit;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The description of the task', example: 'Administer medicine' })
  description: string;

  @IsDate()
  @ApiProperty({
    description: 'The time when the task is scheduled to occur',
    example: '2025-03-26T12:00:00Z',
  })
  eventTime: Date;

  @IsNotEmpty()
  @ApiProperty({ description: 'The category of the task', type: CategoryDto })
  category: CategoryDto;

  @IsNumber()
  @ApiProperty({ description: 'The repeat frequency for the task', example: 1 })
  repeatFor: number;

  @IsBoolean()
  @ApiProperty({ description: 'The completion status of the task', example: false })
  completed: boolean;

  @IsUUID()
  @ApiProperty({
    description: 'The ID of the elderly person associated with the task',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  elderlyId: string;

  @IsUUID()
  @ApiProperty({
    description: 'The ID of the user associated with the task',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;
}
