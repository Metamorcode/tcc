import { v4 as uuidv4 } from 'uuid';
import { Category } from '../../src/domain/enterprise/entities/Category';
import { CategoryRepository } from 'src/domain/application/repositories/category-repository';

export class InMemoryCategoryRepository implements CategoryRepository {
  constructor() {}
  static categories: Category[] = [];

  create(description: string): void {
    const category = new Category(uuidv4(), description);
    InMemoryCategoryRepository.categories.push(category);
  }

  getByDescription(description: string): Category | null {
    const result = InMemoryCategoryRepository.categories.find((category) => {
      return category.getDescription() === description;
    });

    return result ? result : null;
  }
}
