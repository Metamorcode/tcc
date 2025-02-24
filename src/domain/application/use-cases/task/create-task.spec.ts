import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { CreateTaskUseCase } from './create-task';
import { Category } from '../../../enterprise/entities/category';

describe('Create a Task', () => {
  const repository = new InMemoryTaskRepository();

  it('should be able to create a new task', () => {
    const createTask = new CreateTaskUseCase(repository);
    const category = new Category('1', 'Diário');
    createTask.execute({
      description: 'Comprar café',
      eventDate: new Date('2025-02-15:00:00.000Z'),
      category: category,
      completed: false,
    });
    expect(InMemoryTaskRepository.tasks.length).toEqual(1);
  });
});
