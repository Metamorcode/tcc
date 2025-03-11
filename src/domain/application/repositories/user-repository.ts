import { User } from 'src/domain/enterprise/entities/user';
import { UserRoles } from 'src/domain/enterprise/entities/user.role';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract update(user: User): Promise<void>;
  abstract getByName(firstName: string, lastName: string): Promise<User | null>;
  abstract getFirstName(firstName: string): Promise<User | null>;
  abstract getLastName(lastName: string): Promise<User | null>;
  abstract getAllUsers(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
}
