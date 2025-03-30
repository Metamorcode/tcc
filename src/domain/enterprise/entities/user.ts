import { UserRoles } from './user.role';
import { Task } from './task';
import { Category } from './category';
import { v4 as uuidv4 } from 'uuid';

export class User {
  private _id: string;
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
    this._id = id ?? uuidv4();

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

  
  setFirstName(newFirstName: string) {
    this._firstName = newFirstName;
  }

  getLastName() {
    return this._lastName;
  }

  setLastName(newLastName: string) {
    this._lastName = newLastName;
  }

  getEmail() {
    return this._email;
  }

  setEmail(newEmail: string) {
    this._email = newEmail;
  }

  getLogin() {
    return this._login;
  }

  
  setLogin(newLogin: string) {
    this._login = newLogin;
  }

  getPassword() {
    return this._password;
  }

  
  setPassword(newPassword: string) {
    this._password = newPassword;
  }

  getRole() {
    return this._role;
  }

  
  setRole(newRole: UserRoles) {
    this._role = newRole;
  }

  getTasks(): Task[] {
    return [...this._tasks];
  }

  addTask(task: {
    description: string;
    eventTime: Date;
    category: Category;
    repeatFor: number;
    completed: boolean;
    elderlyId: string;
    userId: string;
  }): Task {
    const newTask = new Task(
      task.description,
      task.eventTime,
      task.category,
      task.repeatFor,
      task.completed,
      task.elderlyId,
      task.userId,
    );
    this._tasks.push(newTask);
    return newTask;
  }

  removeTask(taskId: string) {
    this._tasks = this._tasks.filter(task => task.getId() !== taskId);
  }
}
