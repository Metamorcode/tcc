import { Task } from 'src/domain/enterprise/entities/task';

export abstract class TaskRepository {
  abstract create(task: Task): Promise<Task>;
  abstract update(task: Task): Promise<Task>;
  abstract delete(id: string): Promise<boolean>;
  abstract getById(id: string): Promise<Task | null>;
  abstract getAllTasks(): Promise<Task[]>;
  abstract patch(id: string, completed: boolean): Promise<boolean>;
}
