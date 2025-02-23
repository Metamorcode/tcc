import { Category } from './Category';

export class Task {
  private id?: string;
  private description: string;
  private eventDate: Date;
  private completed: boolean;
  private category: Category;
  private createdAt?: Date;

  constructor(
    description: string,
    eventDate: Date,
    completed: boolean,
    category: Category,
    id?: string,
    createdAt?: Date
  ) {
    this.description = description;
    this.eventDate = eventDate;
    this.completed = completed;
    this.category = category;
    this.id = id;
    this.createdAt = createdAt;
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }

  getCreateAt() {
    return this.createdAt;
  }

  getEventDate() {
    return this.eventDate;
  }

  getCompleted() {
    return this.completed;
  }

  getCategory() {
    return this.category;
  }
}
