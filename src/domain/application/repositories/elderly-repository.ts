import { Elderly } from 'src/domain/enterprise/entities/Elderly';

export interface ElderlyProps {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
}

export abstract class ElderlyRepository {
  abstract create(props: ElderlyProps): void;
  abstract update(props: ElderlyProps): void;
  abstract getByName(firstName: string, lastName: string): Elderly | null;
}
