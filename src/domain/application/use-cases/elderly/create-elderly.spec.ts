import { InMemoryElderlyRepository } from '../../../../../test/in-memory/in-memory-elderly-repository';
import { CreateElderlyUseCase } from './create-elderly';
import { validate as isUUID } from 'uuid';

describe('Create Elderly', () => {
  const repository = new InMemoryElderlyRepository();

  it('should be able to create a new elderly', async () => {
    const createElderly = new CreateElderlyUseCase(repository);

    // Criação do objeto Elderly
    const createdElderly = await createElderly.execute(
      'Florêncio',
      'Almonfrey',
      new Date('1941-12-10T00:00:00.000Z'),
      'some-user-id'
    );

    // Verificando se o idoso foi criado no repositório
    expect((await repository.getAllElderly()).length).toEqual(1);

    // Verificando se o ID gerado é válido
    expect(isUUID(createdElderly.getId()!)).toBe(true);
    expect(createdElderly.getFirstName()).toBe('Florêncio');
    expect(createdElderly.getLastName()).toBe('Almonfrey');
    expect(createdElderly.getBirthDate()).toEqual(new Date('1941-12-10T00:00:00.000Z'));
    expect(createdElderly.getUserFamily()).toBe('some-user-id');
  });
});
