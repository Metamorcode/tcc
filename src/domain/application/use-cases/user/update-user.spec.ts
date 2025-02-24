import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { UpdateUserUseCase } from './update-user';
import { v4 as uuidv4 } from 'uuid';
import { UserRoles } from '../../../../domain/enterprise/entities/user.role';

describe('Update a User', () => {
  const repository = new InMemoryUserRepository();

  it('should be able to update a user', () => {
    const updateUser = new UpdateUserUseCase(repository);
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

    const userToUpdate = {
      id,
      firstName: 'Thaygle',
      lastName: 'Nogueira',
      email: 'thaygle@example.com',
      login: 'thaygle',
      password: 'thanksgod',
      role: UserRoles.FAMILYMEMBER,
    };
    updateUser.execute(userToUpdate);
    console.log(InMemoryUserRepository.user[0]);
    expect(InMemoryUserRepository.user[0]).toEqual(userToUpdate);
  });
});
