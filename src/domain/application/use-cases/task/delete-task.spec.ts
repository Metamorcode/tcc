import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { DeleteTaskUseCase } from './delete-task';
import { Category } from '../../../enterprise/entities/category';
import { Task } from '../../../enterprise/entities/task';

describe('Delete a task', () => {
  const repository = new InMemoryTaskRepository();

  it('should be able to Delete a task', () => {
    const deleteTask = new DeleteTaskUseCase(repository);
    const category = new Category('1', 'Diário');
    const task = new Task(
      'Trocar o curativo das costas',
      new Date('2025-02-25T09:00:00.000Z'),
      category,
      5,
      false,
      '1'
    );
    console.log(InMemoryTaskRepository.tasks.length);
    deleteTask.execute('1');
    console.log(InMemoryTaskRepository.tasks.length);
    expect(InMemoryTaskRepository.tasks.length).toEqual(0);
  });
});
