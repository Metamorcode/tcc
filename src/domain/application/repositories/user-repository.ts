import { User } from 'src/domain/enterprise/entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract update(user: User): Promise<User>;
  abstract delete(id: string): Promise<boolean>;
  abstract getAllUsers(): Promise<User[]>;
  abstract getById(id: string): Promise<User | null>;
}
