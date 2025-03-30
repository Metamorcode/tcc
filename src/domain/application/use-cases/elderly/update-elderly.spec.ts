import { InMemoryElderlyRepository } from '../../../../../test/in-memory/in-memory-elderly-repository';
import { UpdateElderlyUseCase } from './update-elderly';
import { v4 as uuidv4 } from 'uuid';
import { Elderly } from '../../../../domain/enterprise/entities/elderly';
import { UpdateElderlyDto } from '../../../../infrastructure/http/controllers/dto/update-elderly-dto';

describe('Update an Elderly', () => {
  let repository: InMemoryElderlyRepository;
  let updateElderly: UpdateElderlyUseCase;

  beforeEach(() => {
    repository = new InMemoryElderlyRepository();
    updateElderly = new UpdateElderlyUseCase(repository);
  });

  it('should be able to update an elderly', async () => {
    const id = uuidv4();

    // Criando um idoso corretamente
    const elderly = new Elderly(
      'Florencio',
      'Almonfrey',
      new Date('1941-12-10T00:00:00.000Z'),
      'some-user-id', 
      id
    );

    await repository.create(elderly);

    // Criando DTO para atualização
    const updateElderlyDto: UpdateElderlyDto = {
      firstName: 'Izalina',
      lastName: 'Bertuani',
      birthDate: new Date('1944-06-07T00:00:00.000Z'),
    };

    // Executando atualização
    const updatedElderly = await updateElderly.execute(id, updateElderlyDto);

    // Validando que os dados foram atualizados corretamente
    expect(updatedElderly).not.toBeNull();
    expect(updatedElderly?.getFirstName()).toBe('Izalina');
    expect(updatedElderly?.getLastName()).toBe('Bertuani');
    expect(updatedElderly?.getBirthDate()).toEqual(new Date('1944-06-07T00:00:00.000Z'));
  });
});
