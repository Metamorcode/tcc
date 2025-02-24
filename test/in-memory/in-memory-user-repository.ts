import { v4 as uuidv4 } from 'uuid';
import { User } from '../../src/domain/enterprise/entities/user';
import { UserRepository, UserProps } from 'src/domain/application/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  constructor() {}
  static user: User[] = [];

  create({ firstName, lastName, email, login, password, role, id }: UserProps): void {
    const newId = id ? id : uuidv4();
    const user = new User(firstName, lastName, email, login, password, role, newId);
    InMemoryUserRepository.user.push(user);
  }

  update({ firstName, lastName, email, login, password, role, id }: UserProps): void {
    const user = new User(firstName, lastName, email, login, password, role, id);
    const userIndex = InMemoryUserRepository.user.findIndex((user) => {
      return user.getId() === id;
    });
    console.log(user);
    InMemoryUserRepository.user[userIndex] = user;
  }

  delete(id: string): void {
    const userIndex = InMemoryUserRepository.user.findIndex((user) => {
      return user.getId() === id;
    });

    if (userIndex !== -1) {
      InMemoryUserRepository.user.splice(userIndex, 1);
    }
  }

  getByName(firstName: string, lastName: string): User | null {
    const result = InMemoryUserRepository.user.find((user) => {
      return user.getByName() === firstName + lastName;
    });

    return result ? result : null;
  }

  getAllUsers(): Promise<User[]> {
    return Promise.resolve(InMemoryUserRepository.user);
  }
}
