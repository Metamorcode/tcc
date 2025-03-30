import { InMemoryUserRepository } from '../../../../../test/in-memory/in-memory-user-repository';
import { UserRoles } from '../../../../domain/enterprise/entities/user.role';
import { GetByIdUserUseCase } from './get-by-id-user';
import { User } from '../../../../domain/enterprise/entities/user';
import { NotFoundException } from '@nestjs/common';

describe('Get user by id', () => {
  let repository: InMemoryUserRepository;
  let getByIdUser: GetByIdUserUseCase;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    getByIdUser = new GetByIdUserUseCase(repository);
  });

  it('should be able to get a user by id', async () => {
    const user1 = new User(
      'Leonardo',
      'Almonfrey',
      'leo.almonfrey@example.com',
      'almonfrey',
      'godishere',
      UserRoles.CREATOR,
      '1'
    );

    const user2 = new User(
      'Thaygle',
      'Nogueira',
      'thaygle@example.com',
      'thaygle',
      'thanksgod',
      UserRoles.FAMILYMEMBER,
      '2'
    );

    await repository.create(user1);
    await repository.create(user2);

    const result = await getByIdUser.execute('1');

    expect(result).not.toBeNull();
    expect(result?.getFirstName()).toBe('Leonardo');
    expect(result?.getLastName()).toBe('Almonfrey');
  });

  it('should throw an error if the user does not exist', async () => {
    const nonExistentId = 'non-existent-id';

    // Espera-se que seja lançada uma exceção NotFoundException
    await expect(getByIdUser.execute(nonExistentId)).rejects.toThrowError(NotFoundException);
  });
});
