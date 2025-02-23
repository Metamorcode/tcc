export class Elderly {
  private id?: string;
  private firstName: string;
  private lastName: string;
  private birthDate: Date;

  constructor(firstName: string, lastName: string, birthDate: Date, id?: string, ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
  }

  getId() {
    return this.id;
  }

  getByName() {
    return this.firstName + this.lastName;
  }

  getBirth() {
    return this.birthDate;
  }
}
