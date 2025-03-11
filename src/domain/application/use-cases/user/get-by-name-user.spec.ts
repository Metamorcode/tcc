import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { UserRoles } from '../../../../domain/enterprise/entities/user.role';
import { GetByNameUserUseCase } from './get-by-name-user';
import { User } from '../../../../domain/enterprise/entities/user';
import { v4 as uuidv4 } from 'uuid';

describe('Get user by name', () => {
  let repository: InMemoryUserRepository;
  let getByNameUser: GetByNameUserUseCase;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    getByNameUser = new GetByNameUserUseCase(repository);
  });

  it('should be able to get a user by the full name', async () => {
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

    const result = await getByNameUser.execute('Leonardo', 'Almonfrey');

    expect(result).not.toBeNull();
    expect(result?.getFirstName()).toBe('Leonardo');
    expect(result?.getLastName()).toBe('Almonfrey');
  });
});
