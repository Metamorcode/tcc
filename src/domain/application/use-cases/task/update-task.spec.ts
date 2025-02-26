import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { UpdateTaskUseCase } from './update-task';
import { Category } from '../../../enterprise/entities/category';
import { v4 as uuidv4 } from 'uuid';

describe('Update a Task', () => {
  const repository = new InMemoryTaskRepository();

  it('should be able to update a task', () => {
    const updateTask = new UpdateTaskUseCase(repository);

    const category = new Category('1', 'Diário');
    const id = uuidv4();
    repository.create({
      id,
      description: 'Trocar o curativo das costas',
      eventTime: new Date('2025-02-25T09:00:00.000Z'),
      category: category,
      repeatFor: 14,
      completed: false,
      elderlyId: '123',
      createdAt: new Date(),
    });

    const taskToUpdate = {
      id,
      description: 'Trocar o curativo das pernas',
      eventTime: new Date('2025-02-25T12:00:00.000Z'),
      category: category,
      repeatFor: 2,
      completed: false,
      elderlyId: '123',
      createdAt: new Date(),
    };

    updateTask.execute(taskToUpdate);
    console.log(InMemoryTaskRepository.tasks[0]);
    expect(InMemoryTaskRepository.tasks[0]).toEqual(taskToUpdate);
  });
});
