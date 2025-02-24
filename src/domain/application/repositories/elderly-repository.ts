import { Elderly } from 'src/domain/enterprise/entities/elderly';

export interface ElderlyProps {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
}

export abstract class ElderlyRepository {
  abstract create(props: ElderlyProps): void;
  abstract update(props: ElderlyProps): void;
  abstract delete(id: string): void;
  abstract getByName(firstName: string, lastName: string): Elderly | null;
  abstract getAllElderly(): Promise<Elderly[]>;
}
