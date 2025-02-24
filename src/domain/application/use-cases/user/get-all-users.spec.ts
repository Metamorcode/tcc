import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { UserRoles } from '../../../enterprise/entities/user.role';
import { GetAllUsersUseCase } from './get-all-users';

describe('Get user by name', () => {
  it('should be able to get all users', async () => {
    const repository = new InMemoryUserRepository();
    await repository.create({
      firstName: 'Leonardo',
      lastName: 'Almonfrey',
      email: 'leo.almonfrey@example.com',
      login: 'almonfrey',
      password: 'godishere',
      role: UserRoles.CREATOR,
    });
    await repository.create({
      firstName: 'Thaygle',
      lastName: 'Nogueira',
      email: 'thaygle@example.com',
      login: 'thaygle',
      password: 'thanksgod',
      role: UserRoles.FAMILYMEMBER,
    });

    const getUsers = new GetAllUsersUseCase(repository);
    const result = await getUsers.execute(); 

    expect(result.length).toBe(2);
  });
});
