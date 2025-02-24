import { InMemoryElderlyRepository } from '../../../../../test/in-memory/in-memory-elderly-repository';
import { GetAllElderlyUseCase } from './get-all-elderly';

describe('Get all Elderly', () => {
  it('should be able to get all Elderly', async () => {
    const repository = new InMemoryElderlyRepository();
    await repository.create({
      firstName: 'Florencio',
      lastName: 'Almonfrey',
      birthDate: new Date('1941-12-10T00:00:00.000Z'),
    });
    await repository.create({
      firstName: 'Izalina',
      lastName: 'Bertuani',
      birthDate: new Date('1944-06-07T00:00:00.000Z'),
    });

    const getElderly = new GetAllElderlyUseCase(repository);
    const result = await getElderly.execute(); 

    expect(result.length).toBe(2);
  });
});
