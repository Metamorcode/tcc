import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from '../../../../domain/enterprise/entities/user.role';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The first name of the user', example: 'John' })
  firstName: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The login of the user', example: 'john.doe' })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The password of the user', example: '123456' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The role of the user', example: 'CREATOR' })
  role: UserRoles;
}
