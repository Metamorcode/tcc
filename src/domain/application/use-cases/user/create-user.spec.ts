import { UserRoles } from '../../../../domain/enterprise/entities/user.role';
import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { CreateUserUseCase } from './create-user';

describe('Create User', () => {
  const repository = new InMemoryUserRepository();

  it('should be able to create a new user', () => {
    const createUser = new CreateUserUseCase(repository);
    createUser.execute({
      firstName: 'Leonardo',
      lastName: 'Almonfrey',
      email: 'leo.almonfrey@example.com',
      login: 'almonfrey',
      password: 'godishere',
      role: UserRoles.CREATOR,
    });
    expect(InMemoryUserRepository.user.length).toEqual(1);
  });
});
