import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { UpdateUserUseCase } from './update-user';
import { v4 as uuidv4 } from 'uuid';
import { UserRoles } from '../../../../domain/enterprise/entities/user.role';
import { User } from '../../../../domain/enterprise/entities/user';
import { UpdateUserDto } from '../../../../infrastructure/http/controllers/dto/update-user-dto'; // Certifique-se de importar o DTO

describe('Update a User', () => {
  let repository: InMemoryUserRepository;
  let updateUser: UpdateUserUseCase;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    updateUser = new UpdateUserUseCase(repository);
  });

  it('should be able to update a user', async () => {
    const id = uuidv4();

    // Criando o usuário como uma instância da classe User
    const user = new User(
      'Leonardo',
      'Almonfrey',
      'leo.almonfrey@example.com',
      'almonfrey',
      'godishere',
      UserRoles.CREATOR,
      id // Passando o ID como argumento
    );

    await repository.create(user); // Aguarde a criação ser concluída

    // Dados para atualizar, criando um DTO com os novos dados
    const updateUserDto: UpdateUserDto = {
      firstName: 'Thaygle',
      lastName: 'Nogueira',
      email: 'thaygle@example.com',
      login: 'thaygle',
      password: 'thanksgod',
      role: UserRoles.FAMILYMEMBER,
    };

    // Atualizando o usuário
    const updatedUser = await updateUser.execute(id, updateUserDto); // Passando o ID e o DTO

    // Verificando se o usuário foi atualizado corretamente
    expect(updatedUser).not.toBeNull(); // Verifica se o usuário não é nulo
    expect(updatedUser?.getFirstName()).toBe('Thaygle');
    expect(updatedUser?.getLastName()).toBe('Nogueira');
    expect(updatedUser?.getEmail()).toBe('thaygle@example.com');
    expect(updatedUser?.getLogin()).toBe('thaygle');
    expect(updatedUser?.getPassword()).toBe('thanksgod');
    expect(updatedUser?.getRole()).toBe(UserRoles.FAMILYMEMBER);
  });
});
