import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { UserRoles } from '../../../enterprise/entities/user.role';
import { GetAllUsersUseCase } from './get-all-users';
import { User } from '../../../enterprise/entities/user';

describe('Get all users', () => {
  let repository: InMemoryUserRepository;
  let getAllUsers: GetAllUsersUseCase;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    getAllUsers = new GetAllUsersUseCase(repository);
  });

  it('should be able to get all users', async () => {
    const user1 = new User(
      'Leonardo',
      'Almonfrey',
      'leo.almonfrey@example.com',
      'almonfrey',
      'godishere',
      UserRoles.CREATOR
    );

    const user2 = new User(
      'Thaygle',
      'Nogueira',
      'thaygle@example.com',
      'thaygle',
      'thanksgod',
      UserRoles.FAMILYMEMBER
    );

    await repository.create(user1);
    await repository.create(user2);

    const result = await getAllUsers.execute();

    // Verificando se o número de usuários é o esperado
    expect(result.length).toBe(2);
    expect(result[0].getFirstName()).toBe('Leonardo');
    expect(result[1].getFirstName()).toBe('Thaygle');
  });

  it('should return an empty list if no users exist', async () => {
    const result = await getAllUsers.execute();

    // Verificando que a lista está vazia
    expect(result.length).toBe(0);
  });
});
