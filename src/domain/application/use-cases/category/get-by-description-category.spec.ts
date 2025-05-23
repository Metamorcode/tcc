import { InMemoryCategoryRepository } from '../../../../../test/in-memory/in-memory-category-repository';
import { GetByCategoryDescriptionUseCase } from './get-by-description-category';

describe('Get Category Description', () => {
  it('should be able to get a category by the description', () => {
    const repository = new InMemoryCategoryRepository();
    repository.create('Diário');
    const getByDescription = new GetByCategoryDescriptionUseCase(repository);
    const result = getByDescription.execute('Diário');
    expect(result?.getDescription()).toEqual('Diário');
  });
});
