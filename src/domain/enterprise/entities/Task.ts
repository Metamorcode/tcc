import { Category } from './category';

export class Task {
  private description: string;
  private eventTime: Date;
  private category: Category;
  private repeatFor: number;
  private completed: boolean;
  private elderlyId: string;
  private id?: string;
  private createdAt?: Date;

  constructor(
    description: string,
    eventTime: Date,
    category: Category,
    repeatFor: number,
    completed: boolean,
    elderlyId: string,
    id?: string,
    createdAt?: Date
  ) {
    this.description = description;
    this.eventTime = eventTime;
    this.category = category;
    this.repeatFor = repeatFor;
    this.completed = completed;
    this.elderlyId = elderlyId;
    this.id = id;
    this.createdAt = createdAt;
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }

  getEventTime() {
    return this.eventTime;
  }

  getCategory() {
    return this.category;
  }

  getRepeatFor() {
    return this.repeatFor;
  }

  getCompleted() {
    return this.completed;
  }

  getElderlyId() {
    return this.elderlyId;
  }

  getCreateAt() {
    return this.createdAt;
  }

  setCompleted(completed: boolean): void {
    this.completed = completed;
  }

  updateStatus(completed: boolean) {
    this.completed = completed;
  }
}
