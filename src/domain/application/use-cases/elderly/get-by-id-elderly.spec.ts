import { InMemoryElderlyRepository } from '../../../../../test/in-memory/in-memory-elderly-repository';
import { GetByIdElderlyUseCase } from './get-by-id-elderly';
import { Elderly } from '../../../../domain/enterprise/entities/elderly';
import { NotFoundException } from '@nestjs/common';

describe('Get elderly by id', () => {
  let repository: InMemoryElderlyRepository;
  let getByIdElderly: GetByIdElderlyUseCase;

  beforeEach(() => {
    repository = new InMemoryElderlyRepository();
    getByIdElderly = new GetByIdElderlyUseCase(repository);
  });

  it('should be able to get an elderly by id', async () => {
    const elderly1 = new Elderly(
      'Leonardo',
      'Almonfrey',
      new Date(), // Data de nascimento
      'male'
    );

    const elderly2 = new Elderly('Thaygle', 'Nogueira', new Date(), 'female');

    await repository.create(elderly1);
    await repository.create(elderly2);

    const elderlyId = elderly1.getId(); // Pegando o ID gerado do primeiro idoso

    const result = await getByIdElderly.execute(elderlyId); // Buscando pelo ID correto

    expect(result).not.toBeNull();
    expect(result?.getFirstName()).toBe('Leonardo');
    expect(result?.getLastName()).toBe('Almonfrey');
  });

  it('should throw an error if the elderly does not exist', async () => {
    const nonExistentId = 'non-existent-id';

    // Espera-se que seja lançada uma exceção NotFoundException
    await expect(getByIdElderly.execute(nonExistentId)).rejects.toThrowError(NotFoundException);
  });
});
