import { InMemoryElderlyRepository } from '../../../../../test/in-memory/in-memory-elderly-repository';
import { DeleteElderlyUseCase } from './delete-elderly';
import { v4 as uuidv4 } from 'uuid';
import { Elderly } from '../../../../domain/enterprise/entities/elderly'; 

describe('Delete Elderly', () => {
  let repository: InMemoryElderlyRepository;
  let deleteElderly: DeleteElderlyUseCase;

  beforeEach(() => {
    repository = new InMemoryElderlyRepository();
    deleteElderly = new DeleteElderlyUseCase(repository);
  });

  it('should be able to delete an elderly', async () => {
    const id = uuidv4();

    // Cria um idoso para deletar
    const elderly = new Elderly(
      'Florencio', 
      'Almonfrey', 
      new Date('1941-12-10T00:00:00.000Z'), 
      'some-user-id',
      id
    );

    // Adiciona o idoso ao repositório
    await repository.create(elderly);

    // Verifica se o idoso foi adicionado ao repositório
    const createdElderly = await repository.getById(id);
    expect(createdElderly).not.toBeNull(); // Confirma que o idoso foi criado

    // Deleta o idoso
    await deleteElderly.execute(id);

    // Verifica que o idoso foi deletado
    const deletedElderly = await repository.getById(id);
    expect(deletedElderly).toBeNull(); // Confirma que o idoso foi deletado
  });

  it('should throw an error if the elderly does not exist', async () => {
    const id = uuidv4();

    // Tenta deletar um idoso que não existe
    await expect(deleteElderly.execute(id)).rejects.toThrowError('Elderly not found');
  });
});
