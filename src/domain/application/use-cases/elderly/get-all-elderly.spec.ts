import { InMemoryElderlyRepository } from '../../../../../test/in-memory/in-memory-elderly-repository';
import { GetAllElderlyUseCase } from './get-all-elderly';
import { Elderly } from '../../../../domain/enterprise/entities/elderly'; // Certifique-se de importar a classe Elderly

describe('Get all Elderly', () => {
  let repository: InMemoryElderlyRepository;
  let getAllElderly: GetAllElderlyUseCase;

  beforeEach(() => {
    repository = new InMemoryElderlyRepository();
    getAllElderly = new GetAllElderlyUseCase(repository);
  });

  it('should be able to get all Elderly', async () => {
    const elderly1 = new Elderly(
      'Florencio',
      'Almonfrey',
      new Date('1941-12-10T00:00:00.000Z'),
      'some-user-id',
      'id1'
    );

    const elderly2 = new Elderly(
      'Izalina',
      'Bertuani',
      new Date('1944-06-07T00:00:00.000Z'),
      'some-user-id',
      'id2'
    );

    await repository.create(elderly1);
    await repository.create(elderly2);

    const result = await getAllElderly.execute();

    // Verificando se o número de idosos é o esperado
    expect(result.length).toBe(2);
    expect(result[0].getFirstName()).toBe('Florencio'); // Verificando o primeiro nome do primeiro idoso
    expect(result[1].getFirstName()).toBe('Izalina'); // Verificando o primeiro nome do segundo idoso
  });

  it('should return an empty list if no elderly exist', async () => {
    const result = await getAllElderly.execute();

    // Verificando que a lista está vazia
    expect(result.length).toBe(0);
  });
});
