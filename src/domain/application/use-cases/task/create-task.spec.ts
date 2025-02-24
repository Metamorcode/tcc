import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { CreateTaskUseCase } from './create-task';
import { Category } from '../../../enterprise/entities/category';
import { Elderly } from '../../../enterprise/entities/elderly';
import { v4 as uuidv4 } from 'uuid';

describe('Create a task', () => {
  const repository = new InMemoryTaskRepository();

  it('should be able to create a new task', () => {
    const createTask = new CreateTaskUseCase(repository);
    const category = new Category('1', 'Diário');
    const newId = uuidv4();
    const elderly = new Elderly(
      'Florêncio',
      'Almonfrey',
      new Date('1941-12-10T00:00:00.000Z'),
      newId
    );
    createTask.execute({
      description: 'Trocar o curativo das costas',
      eventTime: new Date('2025-02-25T09:00:00.000Z'),
      category: category,
      repeatFor: 5,
      completed: false,
      elderlyId: newId,
    });
    expect(InMemoryTaskRepository.tasks.length).toEqual(1);
  });
});
