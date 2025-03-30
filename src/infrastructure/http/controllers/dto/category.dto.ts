import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the category', example: '1' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The description of the category', example: 'Diário' })
  description: string;
}
