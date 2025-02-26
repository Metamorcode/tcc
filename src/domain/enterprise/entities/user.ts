import { UserRoles } from './user.role';

export class User {
  private id?: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private login: string;
  private password: string;
  private role: UserRoles;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    login: string,
    password: string,
    role: UserRoles,
    id?: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.login = login;
    this.password = password;
    this.role = role;
  }

  getId() {
    return this.id;
  }

  getByName() {
    return this.firstName + this.lastName;
  }

  getByEmail() {
    return this.email;
  }

  getByLogin() {
    return this.login;
  }

  getByPassword() {
    return this.password;
  }

  getByRole() {
    return this.role;
  }
}
