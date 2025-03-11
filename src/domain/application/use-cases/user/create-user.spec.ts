import { UserRoles } from '../../../../domain/enterprise/entities/user.role';
import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { CreateUserUseCase } from './create-user';
import { validate as isUUID } from 'uuid';

describe('Create User', () => {
  const repository = new InMemoryUserRepository();

  it('should be able to create a new user', async () => {
    const createUser = new CreateUserUseCase(repository);

    const createdUser = await createUser.execute(
      'Leonardo',
      'Almonfrey',
      'leo.almonfrey@example.com',
      'almonfrey',
      'godishere',
      UserRoles.CREATOR
    );

    expect(isUUID(createdUser.getId()!)).toBe(true);
    expect(createdUser.getFirstName()).toBe('Leonardo');
    expect(createdUser.getLastName()).toBe('Almonfrey');
    expect(createdUser.getEmail()).toBe('leo.almonfrey@example.com');
    expect(createdUser.getLogin()).toBe('almonfrey');
    expect(createdUser.getPassword()).toBe('godishere');
    expect(createdUser.getRole()).toBe(UserRoles.CREATOR);
  });
});
