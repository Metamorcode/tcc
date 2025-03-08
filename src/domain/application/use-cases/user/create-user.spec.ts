import { UserRoles } from '../../../../domain/enterprise/entities/user.role';
import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { CreateUserUseCase } from './create-user';
import { validate as isUUID } from 'uuid';

describe('Create User', () => {
  const repository = new InMemoryUserRepository();

  it('should be able to create a new user', async () => {
    const createUser = new CreateUserUseCase(repository);

    await createUser.execute(
      'Leonardo',
      'Almonfrey',
      'leo.almonfrey@example.com',
      'almonfrey',
      'godishere',
      UserRoles.CREATOR
    );

    // expect(InMemoryUserRepository.users.length).toEqual(1);
    // const createdUser = InMemoryUserRepository.user[0];

    expect(isUUID(createdUser.getId()!)).toBe(true); // Garante que o id gerado é um UUID válido
    expect(createdUser.getFirstName()).toBe('Leonardo');
    expect(createdUser.getLastName()).toBe('Almonfrey');
    expect(createdUser.getEmail()).toBe('leo.almonfrey@example.com');
    expect(createdUser.getLogin()).toBe('almonfrey');
    expect(createdUser.getPassword()).toBe('godishere');
    expect(createdUser.getRole()).toBe(UserRoles.CREATOR);
  });
});
