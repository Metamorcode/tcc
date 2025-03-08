import { UserRoles } from './user.role';
import { Task } from './task';
import { Category } from './category';

export class User {
  private _id?: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _login: string;
  private _password: string;
  private _role: UserRoles;
  private _tasks: Task[];

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    login: string,
    password: string,
    role: UserRoles,
    id?: string,
    tasks: Task[] = []
  ) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._login = login;
    this._password = password;
    this._role = role;
    this._tasks = tasks;
  }

  getId() {
    return this._id;
  }

  getFirstName() {
    return this._firstName;
  }

  getLastName() {
    return this._lastName;
  }

  getEmail() {
    return this._email;
  }

  getLogin() {
    return this._login;
  }

  getPassword() {
    return this._password;
  }

  getRole() {
    return this._role;
  }

  getTasks(): Task[] {
    return [...this._tasks];
  }

  addTask(taskProps: {
    description: string;
    eventTime: Date;
    category: Category;
    repeatFor: number;
    completed: boolean;
    elderlyId: string;
  }): Task {
    const newTask = new Task(
      taskProps.description,
      taskProps.eventTime,
      taskProps.category,
      taskProps.repeatFor,
      taskProps.completed,
      taskProps.elderlyId
    );
    this._tasks.push(newTask);
    return newTask;
  }

  set tasks(tasks: Task[]) {
    this._tasks = tasks;
  }
}
