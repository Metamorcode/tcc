import { v4 as uuidv4 } from 'uuid';
import { User } from '../../src/domain/enterprise/entities/user';
import { UserRepository, UserProps } from 'src/domain/application/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  constructor() {}
  static user: User[] = [];

  create({ firstName, lastName, email, login, password, role, id }: UserProps): Promise<void> {
    return new Promise((resolve) => {
      const newId = id ? id : uuidv4();
      const user = new User(firstName, lastName, email, login, password, role, newId);
      InMemoryUserRepository.user.push(user);
      resolve(); // Resolve a promise, indicando que a operação foi concluída
    });
  }
  

  async update({
    firstName,
    lastName,
    email,
    login,
    password,
    role,
    id,
  }: UserProps): Promise<void> {
    const userIndex = InMemoryUserRepository.user.findIndex((user) => user.getId() === id);

    if (userIndex !== -1) {
      const updatedUser = new User(firstName, lastName, email, login, password, role, id);
      InMemoryUserRepository.user[userIndex] = updatedUser;
    }
  }

  async delete(id: string): Promise<void> {
    const userIndex = InMemoryUserRepository.user.findIndex((user) => user.getId() === id);
  
    if (userIndex !== -1) {
      InMemoryUserRepository.user.splice(userIndex, 1);
    }
  }
  

  async getByName(firstName: string, lastName: string): Promise<User | null> {
    const result = InMemoryUserRepository.user.find((user) => {
      return user.getByName() === firstName + lastName;
    });
  
    return result ? result : null;
  }
  
  async getFirstName(firstName: string): Promise<User | null> {
    const result = InMemoryUserRepository.user.find(
      (user) => user.getFirstName() === firstName
    );
    return result ? result : null;
  }
  
  async getLastName(lastName: string): Promise<User | null> {
    const result = InMemoryUserRepository.user.find(
      (user) => user.getLastName() === lastName
    );
    return result ? result : null;
  }

  async findAll(): Promise<User[]> {
    return InMemoryUserRepository.user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = InMemoryUserRepository.user.find(
      (user) => user.getEmail() === email
    );
    return result ? result : null;
  }
}
