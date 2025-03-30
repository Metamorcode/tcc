import { Elderly } from '../../src/domain/enterprise/entities/elderly';
import { ElderlyRepository } from 'src/domain/application/repositories/elderly-repository';

export class InMemoryElderlyRepository implements ElderlyRepository {
  private elderly: Elderly[] = [];

  async create(elderly: Elderly): Promise<Elderly> {
    this.elderly.push(elderly);
    return elderly;
  }

  async update(elderly: Elderly): Promise<Elderly> {
    const elderlyIndex = this.elderly.findIndex((e) => e.getId() === elderly.getId());

    if (elderlyIndex !== -1) {
      this.elderly[elderlyIndex] = elderly;
      return elderly;
    }

    throw new Error('Elderly not found');
  }

  async getById(id: string): Promise<Elderly | null> {
    const result = this.elderly.find((e) => e.getId() === id);
    return result || null;
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.elderly.length;
    this.elderly = this.elderly.filter((e) => e.getId() !== id);
    return this.elderly.length < initialLength;
  }

  async getByName(firstName: string, lastName: string): Promise<Elderly | null> {
    const result = this.elderly.find(
      (e) => e.getFirstName() === firstName && e.getLastName() === lastName
    );
    return result || null;
  }

  async getAllElderly(): Promise<Elderly[]> {
    return this.elderly;
  }

  reset(): void {
    this.elderly = [];
  }
}
