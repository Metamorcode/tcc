import { User } from 'src/domain/enterprise/entities/user';
import { UserRoles } from 'src/domain/enterprise/entities/user.role';

export interface UserProps {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;
  role: UserRoles;
}

export abstract class UserRepository {
  abstract create(user: UserProps): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract update(user: UserProps): Promise<void>;
  abstract getByName(firstName: string, lastName: string): Promise<User | null>;
  abstract getFirstName(firstName: string): Promise<User | null>;
  abstract getLastName(lastName: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
}

