import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { UpdateUserUseCase } from './update-user';
import { v4 as uuidv4 } from 'uuid';
import { UserRoles } from '../../../../domain/enterprise/entities/user.role';
import { User } from '../../../../domain/enterprise/entities/user';

describe('Update a User', () => {
  let repository: InMemoryUserRepository;
  let updateUser: UpdateUserUseCase;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    updateUser = new UpdateUserUseCase(repository);
  });

  it('should be able to update a user', async () => {
    const id = uuidv4();
    const user = new User(
      'Leonardo',
      'Almonfrey',
      'leo.almonfrey@example.com',
      'almonfrey',
      'godishere',
      UserRoles.CREATOR,
      id
    );

    await repository.create(user);

    const updatedUser = new User(
      'Thaygle',
      'Nogueira',
      'thaygle@example.com',
      'thaygle',
      'thanksgod',
      UserRoles.FAMILYMEMBER,
      id
    );

    await updateUser.execute(updatedUser);

    const storedUser = await repository.getById(id);

    expect(storedUser).not.toBeNull();
    expect(storedUser?.getFirstName()).toBe('Thaygle');
    expect(storedUser?.getLastName()).toBe('Nogueira');
    expect(storedUser?.getEmail()).toBe('thaygle@example.com');
    expect(storedUser?.getLogin()).toBe('thaygle');
    expect(storedUser?.getRole()).toBe(UserRoles.FAMILYMEMBER);
  });
});
