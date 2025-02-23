import { InMemoryCategoryRepository } from '../../../../../test/in-memory/in-memory-category-repository';
import { CreateCategoryUseCase } from './create-category';

describe('Create Category', () => {
  const repository = new InMemoryCategoryRepository();

  it('should be able to create a new category', () => {
    const createCategory = new CreateCategoryUseCase(repository);
    createCategory.execute('Diário');
    expect(InMemoryCategoryRepository.categories.length).toEqual(1);
  });
});
