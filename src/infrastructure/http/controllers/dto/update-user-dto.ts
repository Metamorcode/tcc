import { IsString, IsEmail, IsEnum } from 'class-validator';
import { UserRoles } from '../../../../domain/enterprise/entities/user.role';

export class UpdateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsEnum(UserRoles)
  role: UserRoles;
}
