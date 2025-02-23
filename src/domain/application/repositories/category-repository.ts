import { Category } from 'src/domain/enterprise/entities/Category';

export abstract class CategoryRepository {
  abstract create(descritpion: string): void;
  abstract getByDescription(description: string): Category | null;
}
