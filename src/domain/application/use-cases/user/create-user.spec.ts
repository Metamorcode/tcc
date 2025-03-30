import { UserRoles } from '../../../../domain/enterprise/entities/user.role';
import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { CreateUserUseCase } from './create-user';
import { validate as isUUID } from 'uuid';

describe('Create User', () => {
  const repository = new InMemoryUserRepository();

  it('should be able to create a new user', async () => {
    const createUser = new CreateUserUseCase(repository);

    const createdUser = await createUser.execute(
      'Mary',
      'Jane',
      'jane.mary@example.com',
      'jane',
      'spiderman2002',
      UserRoles.CREATOR
    );

    expect((await repository.getAllUsers()).length).toEqual(1);

    expect(isUUID(createdUser.getId()!)).toBe(true);
    expect(createdUser.getFirstName()).toBe('Mary');
    expect(createdUser.getLastName()).toBe('Jane');
    expect(createdUser.getEmail()).toBe('jane.mary@example.com');
    expect(createdUser.getLogin()).toBe('jane');
    expect(createdUser.getPassword()).toBe('spiderman2002');
    expect(createdUser.getRole()).toBe(UserRoles.CREATOR);
  });
});
