import { UserRoles } from '../../../../../src/domain/enterprise/entities/user.role';
import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { DeleteUserUseCase } from './delete-user';
import { User } from '../../../../../src/domain/enterprise/entities/user';
import { v4 as uuidv4 } from 'uuid';

describe('Delete a User', () => {
  let repository: InMemoryUserRepository;
  let deleteUser: DeleteUserUseCase;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    deleteUser = new DeleteUserUseCase(repository);
  });

  it('should be able to delete a user', async () => {
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

    expect((await repository.getAllUsers()).length).toEqual(1);

    await deleteUser.execute(id); 

    expect((await repository.getAllUsers()).length).toEqual(0); 
  });
});
