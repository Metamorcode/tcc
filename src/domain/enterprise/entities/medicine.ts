import { Task } from './task';
import { Category } from './category';
import { MedicineUnit } from './medicine.unit';
import { v4 as uuidv4 } from 'uuid';

export class Medicine extends Task {
  private _medicineId: string; 

  constructor(
    private _name: string,
    private _quantity: number,
    private _unit: MedicineUnit,
    description: string,
    eventTime: Date,
    category: Category,
    repeatFor: number,
    completed: boolean,
    elderlyId: string,
    userId: string,
    medicineId?: string,
    createdAt?: Date
  ) {
    super(description, eventTime, category, repeatFor, completed, elderlyId, userId, createdAt);
    this._medicineId = medicineId || uuidv4(); 
  }

  getMedicineId() {
    return this._medicineId;
  }

  getTaskId() {
    return super.getId(); 
  }

  getName() {
    return this._name;
  }

  getQuantity() {
    return this._quantity;
  }

  getUnit() {
    return this._unit;
  }

  setName(name: string) {
    this._name = name;
  }

  setQuantity(quantity: number) {
    this._quantity = quantity;
  }

  setUnit(unit: MedicineUnit) {
    this._unit = unit;
  }

  setDescription(description: string) {
    super.setDescription(description);
  }

  setEventTime(eventTime: Date) {
    super.setEventTime(eventTime);
  }

  setCategory(category: Category) {
    super.setCategory(category);
  }

  setRepeatFor(repeatFor: number) {
    super.setRepeatFor(repeatFor);
  }

  setCompleted(completed: boolean) {
    super.setCompleted(completed);
  }

  setElderlyId(elderlyId: string) {
    super.setElderlyId(elderlyId);
  }
}
