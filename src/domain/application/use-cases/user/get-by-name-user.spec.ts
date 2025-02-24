import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { UserRoles } from '../../../../domain/enterprise/entities/user.role';
import { GetByNameUserUseCase } from './get-by-name-user';

describe('Get user by name', () => {
  it('should be able to get a user by the full name', () => {
    const repository = new InMemoryUserRepository();
    repository.create({
      firstName: 'Leonardo',
      lastName: 'Almonfrey',
      email: 'leo.almonfrey@example.com',
      login: 'almonfrey',
      password: 'godishere',
      role: UserRoles.CREATOR,
    });
    repository.create({
      firstName: 'Thaygle',
      lastName: 'Nogueira',
      email: 'thaygle@example.com',
      login: 'thaygle',
      password: 'thanksgod',
      role: UserRoles.FAMILYMEMBER,
    });
    const getName = new GetByNameUserUseCase(repository);
    const result = getName.execute('Leonardo', 'Almonfrey');
    expect(result?.getByName()).toEqual('Leonardo' + 'Almonfrey');
  });
});
