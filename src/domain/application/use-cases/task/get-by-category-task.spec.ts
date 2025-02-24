import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { GetByCategoryTaskUseCase } from './get-by-category-task';

import { Category } from '../../../enterprise/entities/category';

describe('Get Task by category', () => {
  const repository = new InMemoryTaskRepository();
  const dailyCategory = new Category('1', 'Diário');
  const Weeklycategory = new Category('2', 'Semanal');

  it('should be able to get a Task by category', () => {
    repository.create({
      id: '1',
      description: 'Trocar o curativo das costas',
      eventTime: new Date('2025-02-25T09:00:00.000Z'),
      category: dailyCategory,
      repeatFor: 14,
      completed: false,
      elderlyId: '123',
      createdAt: new Date('2025-02-25T23:00:00.000Z'),
    });

    repository.create({
      id: '2',
      description: 'Trocar o curativo das pernas',
      eventTime: new Date('2025-02-25T12:00:00.000Z'),
      category: Weeklycategory,
      repeatFor: 2,
      completed: false,
      elderlyId: '123',
      createdAt: new Date(),
    });

    const getCategory = new GetByCategoryTaskUseCase(repository);
    const result = getCategory.execute('Diário') || [];
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      id: '1',
      description: 'Trocar o curativo das costas',
      eventTime: new Date('2025-02-25T09:00:00.000Z'),
      category: dailyCategory,
      repeatFor: 14,
      completed: false,
      elderlyId: '123',
      createdAt: new Date('2025-02-25T23:00:00.000Z'),
    });
  });
});
