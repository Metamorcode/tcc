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
  abstract create(props: UserProps): void;
  abstract delete(id: string): void;
  abstract update(props: UserProps): void;
  abstract getByName(firstName: string, lastName: string): User | null;
  abstract getAllUsers(): Promise<User[]>;
}
