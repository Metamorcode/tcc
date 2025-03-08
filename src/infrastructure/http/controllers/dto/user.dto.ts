import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from '../../../../domain/enterprise/entities/user.role';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The first name of the user', example: 'John' })
  firstName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  role: UserRoles;
}
