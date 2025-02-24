import { InMemoryElderlyRepository } from '../../../../../test/in-memory/in-memory-elderly-repository';
import { DeleteElderlyUseCase } from './delete-elderly';
import { v4 as uuidv4 } from 'uuid';

describe('Delete a Elderly', () => {
  const repository = new InMemoryElderlyRepository();

  it('should be able to Delete a elderly', () => {
    const deleteElderly = new DeleteElderlyUseCase(repository);
    const id = uuidv4();
    repository.create({
      id,
      firstName: 'Florencio',
      lastName: 'Almonfrey',
      birthDate: new Date('1941-12-10T00:00:00.000Z'),
    });
    console.log(InMemoryElderlyRepository.elderly.length);
    deleteElderly.execute(id);
    console.log(InMemoryElderlyRepository.elderly.length);
    expect(InMemoryElderlyRepository.elderly.length).toEqual(0);
  });
});
