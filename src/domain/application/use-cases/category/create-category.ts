import { CategoryRepository } from '../../repositories/category-repository';

export class CreateCategoryUseCase {
  constructor(readonly repository: CategoryRepository) {}

  execute(description: string) {
    this.repository.create(description);
  }
}
