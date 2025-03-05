import { Category } from 'src/domain/enterprise/entities/category';
import { Task } from 'src/domain/enterprise/entities/task';

export interface TaskProps {
  id?: string;
  description: string;
  eventTime: Date;
  category: Category;
  repeatFor: number;
  completed: boolean;
  createdAt?: Date;
  elderlyId: string;
}

export abstract class TaskRepository {
  abstract create(props: Task): Promise<void>;
  abstract delete(id: string): void;
  abstract update(props: TaskProps): void;
  abstract patch(id: string, completed: boolean): void;
  abstract getAllTasks(): Promise<Task[]>;
  abstract getByCategory(category: string): Task[];
}
