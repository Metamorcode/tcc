import { User } from '../../src/domain/enterprise/entities/user';
import { UserRepository } from 'src/domain/application/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user; 
  }

  async update(user: User): Promise<User> {
    const userIndex = this.users.findIndex((u) => u.getId() === user.getId());

    if (userIndex !== -1) {
      this.users[userIndex] = user;
      return user; 
    }

    throw new Error('User not found');
  }
  
    async getById(id: string): Promise<User | null> {
      const result = this.users.find((user) => user.getId() === id);
      return result || null;
    }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.getId() !== id);
    return this.users.length < initialLength; 
  }

  async getByName(firstName: string, lastName: string): Promise<User | null> {
    const result = this.users.find(
      (user) => user.getFirstName() === firstName && user.getLastName() === lastName
    );
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

  async getByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.getEmail() === email) || null;
  }

  reset(): void {
    this.users = [];
  }
}
