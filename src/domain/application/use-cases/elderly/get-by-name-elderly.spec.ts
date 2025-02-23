import { InMemoryElderlyRepository } from '../../../../../test/in-memory/in-memory-elderly-repository';
import { GetByNameElderlyUseCase } from './get-by-name-elderly';

describe('Get Elderly by name', () => {
  it('should be able to get a elderly by the full name', () => {
    const repository = new InMemoryElderlyRepository();
    repository.create({
      firstName: 'Florencio',
      lastName: 'Almonfrey',
      birthDate: new Date('1941-12-10T00:00:00.000Z'),
    });
    repository.create({
      firstName: 'Izalina',
      lastName: 'Bertuani',
      birthDate: new Date('1944-06-07T00:00:00.000Z'),
    });
    const getName = new GetByNameElderlyUseCase(repository);
    const result = getName.execute('Florencio','Almonfrey');
    expect(result?.getByName()).toEqual('Florencio'+'Almonfrey');
  });
});
