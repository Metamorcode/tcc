import { Category } from 'src/domain/enterprise/entities/category';

export abstract class CategoryRepository {
  abstract create(descritpion: string): Promise<Category>;
  abstract getByDescription(description: string): Promise<Category | null>;
}
