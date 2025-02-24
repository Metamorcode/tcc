import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { GetAllTasksUseCase } from './get-all-tasks';
import { Category } from '../../../enterprise/entities/category';

describe('Get Task by name', () => {
  it('should be able to get all Tasks', async () => {
    const repository = new InMemoryTaskRepository();
    const category = new Category('1', 'Diário');
    await repository.create({
      id: '1',
      description: 'Trocar o curativo das costas',
      eventTime: new Date('2025-02-25T09:00:00.000Z'),
      category: category,
      repeatFor: 14,
      completed: false,
      elderlyId: '123',
      createdAt: new Date(),
    });

    await repository.create({
      id: '2',
      description: 'Trocar o curativo das pernas',
      eventTime: new Date('2025-02-25T12:00:00.000Z'),
      category: category,
      repeatFor: 2,
      completed: false,
      elderlyId: '123',
      createdAt: new Date(),
    });

    const getTasks = new GetAllTasksUseCase(repository);
    const result = await getTasks.execute();

    expect(result.length).toBe(2);
  });
});
