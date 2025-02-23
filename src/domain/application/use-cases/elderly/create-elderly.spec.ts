import { InMemoryElderlyRepository } from '../../../../../test/in-memory/in-memory-elderly-repository';
import { CreateElderlyUseCase } from './create-elderly';

describe('Create Elderly', () => {
  const repository = new InMemoryElderlyRepository();

  it('should be able to create a new elderly', () => {
    const createElderly = new CreateElderlyUseCase(repository);
    createElderly.execute({
      firstName: 'Florêncio',
      lastName: 'Almonfrey',
      birthDate: new Date('1941-12-10T00:00:00.000Z'),
    });
    expect(InMemoryElderlyRepository.elderly.length).toEqual(1);
  });
});
