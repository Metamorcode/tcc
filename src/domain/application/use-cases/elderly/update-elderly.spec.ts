import { InMemoryElderlyRepository } from '../../../../../test/in-memory/in-memory-elderly-repository';
import { UpdateElderlyUseCase } from './update-elderly';
import { v4 as uuidv4 } from 'uuid';

describe('Update a Elderly', () => {
  const repository = new InMemoryElderlyRepository();

  it('should be able to update a elderly', () => {
    const updateElderly = new UpdateElderlyUseCase(repository);
    const id = uuidv4();
    repository.create({
      id,
      firstName: 'Florencio',
      lastName: 'Almonfrey',
      birthDate: new Date('1941-12-10T00:00:00.000Z'),
    });

    const elderlyToUpdate = {
      id,
      firstName: 'Izalina',
      lastName: 'Bertuani',
      birthDate: new Date('1944-06-07T00:00:00.000Z'),
    };
    updateElderly.execute(elderlyToUpdate);
    console.log(InMemoryElderlyRepository.elderly[0]);
    expect(InMemoryElderlyRepository.elderly[0]).toEqual(elderlyToUpdate);
  });
});
