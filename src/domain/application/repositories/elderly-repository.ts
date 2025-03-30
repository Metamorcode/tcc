import { Elderly } from 'src/domain/enterprise/entities/elderly';

export abstract class ElderlyRepository {
  abstract create(elderly: Elderly): Promise<Elderly>;
  abstract update(elderly: Elderly): Promise<Elderly>;
  abstract delete(id: string): Promise<boolean>;
  abstract getById(id: string): Promise<Elderly | null>;
  abstract getAllElderly(): Promise<Elderly[]>;
}
