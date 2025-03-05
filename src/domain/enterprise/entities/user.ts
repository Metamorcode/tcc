import { UserRoles } from './user.role';
import { Task } from './task';
import { Category } from './category';

export class User {
  private id?: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private login: string;
  private password: string;
  private role: UserRoles;
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
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.login = login;
    this.password = password;
    this.role = role;
    this._tasks = tasks; 
  }

  getId() {
    return this.id;
  }

  getByName() {
    return this.firstName;
  }

  getFirstName() {
    return this.firstName;
  }
  
  getLastName() {
    return this.firstName + this.lastName;
  }

  getEmail() {
    return this.email;
  }

  getLogin() {
    return this.login;
  }

  getPassword() {
    return this.password;
  }

  getByRole() {
    return this.role;
  }

  get tasks(): Task[] { 
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
