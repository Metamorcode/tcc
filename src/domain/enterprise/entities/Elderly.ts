import { v4 as uuidv4 } from 'uuid';

export class Elderly {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _birthDate: Date;
  private _userFamily: string;
  private _tasks: any[] = []; 

  constructor(
    firstName: string,
    lastName: string,
    birthDate: Date,
    userFamily: string,
    id?: string
  ) {
    this._id = id ?? uuidv4();
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthDate = birthDate;
    this._userFamily = userFamily;
  }

  getId(): string {
    return this._id;
  }

  getFirstName(): string {
    return this._firstName;
  }

  setFirstName(newFirstName: string): void {
    this._firstName = newFirstName;
  }

  getLastName(): string {
    return this._lastName;
  }

  setLastName(newLastName: string): void {
    this._lastName = newLastName;
  }

  getBirthDate(): Date {
    return this._birthDate;
  }

  setBirthDate(newBirthDate: Date): void {
    this._birthDate = newBirthDate;
  }

  getUserFamily(): string {
    return this._userFamily;
  }

  setUserFamily(newUserFamily: string): void {
    this._userFamily = newUserFamily;
  }

  addTask(task: any): void {
    this._tasks.push(task);
  }
  
  getTasks(): any[] {
    return this._tasks;
  }
}
