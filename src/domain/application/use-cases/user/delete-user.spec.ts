import { UserRoles } from '../../../../../src/domain/enterprise/entities/user.role';
import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { DeleteUserUseCase } from './delete-user';
import { v4 as uuidv4 } from 'uuid';

describe('Delete a User', () => {
  const repository = new InMemoryUserRepository();

  it('should be able to Delete a user', () => {
    const deleteUser = new DeleteUserUseCase(repository);
    const id = uuidv4();
    repository.create({
      id,
      firstName: 'Leonardo',
      lastName: 'Almonfrey',
      email: 'leo.almonfrey@example.com',
      login: 'almonfrey',
      password: 'godishere',
      role: UserRoles.CREATOR,
    });
    console.log(InMemoryUserRepository.user.length);
    deleteUser.execute(id);
    console.log(InMemoryUserRepository.user.length);
    expect(InMemoryUserRepository.user.length).toEqual(0);
  });
});
