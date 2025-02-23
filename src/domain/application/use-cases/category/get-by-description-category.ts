import { CategoryRepository } from '../../repositories/category-repository';
import { Category } from '../../../enterprise/entities/Category';

export class GetByCategoryDescriptionUseCase {
  constructor(readonly repository: CategoryRepository) {}

  execute(description: string): Category | null {
    return this.repository.getByDescription(description);
  }
}
