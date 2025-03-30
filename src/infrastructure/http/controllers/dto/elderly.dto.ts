import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from '../../../../domain/enterprise/entities/user.role';

export class ElderlyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The first name of the elderly person', example: 'John' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The last name of the elderly person', example: 'Doe' })
  lastName: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The birth date of the elderly person', example: '1950-05-15' })
  birthDate: Date; // Format: YYYY-MM-DD

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The family of the elderly person', example: 'Smith Family' })
  userFamily: string;
}
