import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { UserRoles } from '../../../enterprise/entities/user.role';
import { GetAllUsersUseCase } from './get-all-users';
import { User } from '../../../enterprise/entities/user';
import { v4 as uuidv4 } from 'uuid';

describe('Get all users', () => {
  let repository: InMemoryUserRepository;
  let getUsers: GetAllUsersUseCase;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    getUsers = new GetAllUsersUseCase(repository);
  });

  it('should be able to get all users', async () => {
    const user1 = new User(
      'Leonardo',
      'Almonfrey',
      'leo.almonfrey@example.com',
      'almonfrey',
      'godishere',
      UserRoles.CREATOR,
      uuidv4()
    );

    const user2 = new User(
      'Thaygle',
      'Nogueira',
      'thaygle@example.com',
      'thaygle',
      'thanksgod',
      UserRoles.FAMILYMEMBER,
      uuidv4()
    );

    await repository.create(user1);
    await repository.create(user2);

    const result = await getUsers.execute();

    expect(result.length).toBe(2);
    expect(result).toEqual([user1, user2]);
  });
});
