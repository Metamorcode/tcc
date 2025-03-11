import { User } from '../../src/domain/enterprise/entities/user';
import { UserRepository } from 'src/domain/application/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.getId() === user.getId());
    if (index !== -1) {
      this.users[index] = user;
    } else {
      this.users.push(user);
    }
  }

  async update(user: User): Promise<void> {
    const userIndex = this.users.findIndex((existingUser) => existingUser.getId() === user.getId());

    if (userIndex !== -1) {
      this.users[userIndex] = user;
    } else {
      throw new Error('User not found');
    }
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.getId() !== id);
  }

  async getByName(firstName: string, lastName: string): Promise<User | null> {
    const result = this.users.find(
      (user) => user.getFirstName() === firstName && user.getLastName() === lastName
    );
    return result || null;
  }

  async getById(id: string): Promise<User | null> {
    const result = this.users.find((user) => user.getId() === id);
    return result || null;
  }

  async getFirstName(firstName: string): Promise<User | null> {
    return this.users.find((user) => user.getFirstName() === firstName) || null;
  }

  async getLastName(lastName: string): Promise<User | null> {
    return this.users.find((user) => user.getLastName() === lastName) || null;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.getEmail() === email) || null;
  }

  /** Utility method for clearing repository data in tests */
  reset(): void {
    this.users = [];
  }
}
