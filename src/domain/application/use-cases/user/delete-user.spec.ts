import { UserRoles } from '../../../../../src/domain/enterprise/entities/user.role';
import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { DeleteUserUseCase } from './delete-user';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../../../src/domain/enterprise/entities/user';

describe('Delete a User', () => {
  let repository: InMemoryUserRepository;
  let deleteUser: DeleteUserUseCase;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    deleteUser = new DeleteUserUseCase(repository);
  });

  it('should be able to delete a user', async () => {
    const id = uuidv4();

    // Usando o construtor para criar o usuário corretamente
    const user = new User(
      'Leonardo',
      'Almonfrey',
      'leo.almonfrey@example.com',
      'almonfrey',
      'godishere',
      UserRoles.CREATOR,
      id
    );

    // Esperar a criação do usuário
    await repository.create(user);

    // Verificar que o usuário foi criado
    const createdUser = await repository.getById(id);
    expect(createdUser).not.toBeNull(); // Confirma que o usuário foi criado

    // Deletar o usuário
    await deleteUser.execute(id);

    // Verificar que o usuário foi deletado
    const deletedUser = await repository.getById(id);
    expect(deletedUser).toBeNull(); // Confirma que o usuário foi deletado
  });

  it('should throw an error if the user does not exist', async () => {
    const id = uuidv4();

    // Tentar deletar um usuário que não existe
    await expect(deleteUser.execute(id)).rejects.toThrowError('User not found');
  });
});
