import { Category } from './category';
import { v4 as uuidv4 } from 'uuid';

export class Task {
  private _description: string;
  private _eventTime: Date;
  private _category: Category;
  private _repeatFor: number;
  private _completed: boolean;
  private _elderlyId: string;
  private _userId: string;
  private _id: string;
  private _createdAt: Date;

  constructor(
    description: string,
    eventTime: Date,
    category: Category,
    repeatFor: number,
    completed: boolean,
    elderlyId: string,
    userId: string,
    createdAt: Date = new Date(),
    id?: string
  ) {
    this._description = description;
    this._eventTime = eventTime;
    this._category = category;
    this._repeatFor = repeatFor;
    this._completed = completed;
    this._elderlyId = elderlyId;
    this._userId = userId;
    this._createdAt = createdAt;
    this._id = id ?? uuidv4();
  }

  getId() {
    return this._id;
  }

  getDescription() {
    return this._description;
  }

  getEventTime() {
    return this._eventTime;
  }

  getCategory() {
    return this._category;
  }

  getRepeatFor() {
    return this._repeatFor;
  }

  getCompleted() {
    return this._completed;
  }

  getUserId() {
    return this._userId;
  }

  getElderlyId() {
    return this._elderlyId;
  }

  getCreatedAt() {
    return this._createdAt;
  }

  // Setters para permitir a atualização dos campos

  setDescription(description: string): void {
    this._description = description;
  }

  setEventTime(eventTime: Date): void {
    this._eventTime = eventTime;
  }

  setCategory(category: Category): void {
    this._category = category;
  }

  setRepeatFor(repeatFor: number): void {
    this._repeatFor = repeatFor;
  }

  setCompleted(completed: boolean): void {
    this._completed = completed;
  }

  setElderlyId(elderlyId: string): void {
    this._elderlyId = elderlyId;
  }

  updateStatus(completed: boolean) {
    this._completed = completed;
  }

  setUserId(userId: string): void {
    this._userId = userId;
  }
}
