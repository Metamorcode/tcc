export class Elderly {
  private id?: string;
  private firstName: string;
  private lastName: string;
  private birthDate: Date;

  constructor(firstName: string, lastName: string, birthDate: Date, id?: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
  }

  getId(): string | undefined {
    return this.id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getByName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getBirth(): Date {
    return this.birthDate;
  }
}
