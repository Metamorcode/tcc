import { Category } from 'src/domain/enterprise/entities/Category';

export interface TaskProps {
  id?: string;
  description: string;
  eventDate: Date;
  completed: boolean;
  category: Category;
  createdAt?: Date;
}

export abstract class TaskRepository {
  abstract create(props: TaskProps): void;
  abstract update(props: TaskProps): void;
}
