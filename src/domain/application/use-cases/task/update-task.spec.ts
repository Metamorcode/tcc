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
      description: 'Comprar café',
      eventDate: new Date(),
      category: category,
      completed: false,
      createdAt: new Date(),
    });

    const newCategory = new Category('2', 'Semanal');
    const taskToUpdate = {
      id,
      description: 'Comprar pão',
      eventDate: new Date(),
      category: newCategory,
      completed: false,
      createdAt: new Date(),
    };

    updateTask.execute(taskToUpdate);
    console.log(InMemoryTaskRepository.tasks[0]);
    expect(InMemoryTaskRepository.tasks[0]).toEqual(taskToUpdate);
  });
});
