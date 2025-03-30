import { IsString, IsDateString } from 'class-validator';

export class UpdateElderlyDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsDateString()
  birthDate?: Date;

  @IsString()
  userFamilyId?: string;
}
