export class Category {
  private id: string;
  private description: string;

  constructor(id: string, description: string) {
    this.id = id;
    this.description = description;
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }
}
