import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { DeleteTaskUseCase } from './delete-task';
import { Category } from '../../../enterprise/entities/category';
import { Elderly } from '../../../enterprise/entities/elderly';
import { Task } from '../../../enterprise/entities/task';
import { v4 as uuidv4 } from 'uuid';

describe('Delete a task', () => {
  const repository = new InMemoryTaskRepository();

  it('should be able to Delete a task', () => {
    const deleteTask = new DeleteTaskUseCase(repository);
    const category = new Category('1', 'Diário');
    const newId = uuidv4();
    const elderly = new Elderly(
      'Florêncio',
      'Almonfrey',
      new Date('1941-12-10T00:00:00.000Z'),
      newId
    );
    const task = new Task(
      'Trocar o curativo das costas',
      new Date('2025-02-25T09:00:00.000Z'),
      category,
      5,
      false,
      newId
    );
    console.log(InMemoryTaskRepository.tasks.length);
    deleteTask.execute(newId);
    console.log(InMemoryTaskRepository.tasks.length);
    expect(InMemoryTaskRepository.tasks.length).toEqual(0);
  });
});
