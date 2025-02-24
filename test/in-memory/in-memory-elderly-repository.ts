import { v4 as uuidv4 } from 'uuid';
import { Elderly } from '../../src/domain/enterprise/entities/elderly';
import {
  ElderlyRepository,
  ElderlyProps,
} from 'src/domain/application/repositories/elderly-repository';

export class InMemoryElderlyRepository implements ElderlyRepository {
  constructor() {}
  static elderly: Elderly[] = [];

  create({ id, firstName, lastName, birthDate }: ElderlyProps): void {
    const newId = id ? id : uuidv4();
    const elderly = new Elderly(firstName, lastName, birthDate, newId);
    InMemoryElderlyRepository.elderly.push(elderly);
  }

  update({ id, firstName, lastName, birthDate }: ElderlyProps): void {
    const elderly = new Elderly(firstName, lastName, birthDate, id);
    const elderlyIndex = InMemoryElderlyRepository.elderly.findIndex((elderly) => {
      return elderly.getId() === id;
    });
    console.log(elderly);
    InMemoryElderlyRepository.elderly[elderlyIndex] = elderly;
  }

  delete(id: string): void {
    const elderlyIndex = InMemoryElderlyRepository.elderly.findIndex((elderly) => {
      return elderly.getId() === id;
    });

    if (elderlyIndex !== -1) {
      InMemoryElderlyRepository.elderly.splice(elderlyIndex, 1);
    }
  }

  getByName(firstName: string, lastName: string): Elderly | null {
    const result = InMemoryElderlyRepository.elderly.find((elderly) => {
      return elderly.getByName() === firstName + lastName;
    });

    return result ? result : null;
  }
}
