import { TaskProps, TaskRepository } from 'src/domain/application/repositories/task-repository';
import { Task } from '../../src/domain/enterprise/entities/Task';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryTaskRepository implements TaskRepository {
  constructor() {}
  static tasks: Task[] = [];

  create({ id, description, eventDate, completed, category, createdAt }: TaskProps): void {
    const newId = id ? id : uuidv4();
    const task = new Task(description, eventDate, completed, category, newId, createdAt);
    InMemoryTaskRepository.tasks.push(task);
  }

  update({ id, description, eventDate, completed, category, createdAt }: TaskProps): void {
    const task = new Task(description, eventDate, completed, category, id, createdAt);
    const taskIndex = InMemoryTaskRepository.tasks.findIndex((task) => {
      return task.getId() === id;
    });
    console.log(task);
    InMemoryTaskRepository.tasks[taskIndex] = task;
  }
}
