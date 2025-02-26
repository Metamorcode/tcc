import { Task } from './task';
import { Category } from './category';
import { MedicineUnit } from './medicine.unit';

export class Medicine extends Task {
  constructor(
    private name: string,
    private quantity: number,
    private unit: MedicineUnit,
    description: string,
    eventTime: Date,
    category: Category,
    repeatFor: number,
    completed: boolean,
    elderlyId: string,
    id?: string,
    createdAt?: Date
  ) {
    super(description, eventTime, category, repeatFor, completed, elderlyId, id, createdAt);
  }

  getName() {
    return this.name;
  }

  getQuantity() {
    return this.quantity;
  }

  getUnit() {
    return this.unit;
  }
}
