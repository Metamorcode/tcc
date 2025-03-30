import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { GetAllTasksUseCase } from './get-all-tasks';
import { Task } from '../../../enterprise/entities/task';
import { Category } from '../../../enterprise/entities/category';
import { v4 as uuidv4 } from 'uuid';

describe('Get all tasks', () => {
  let repository: InMemoryTaskRepository;
  let getAllTasks: GetAllTasksUseCase;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    getAllTasks = new GetAllTasksUseCase(repository);
  });

  it('should be able to get all tasks', async () => {
    const userId = uuidv4(); // Adicionando userId
    const category = new Category('1', 'Diário');

    const task1 = new Task(
      'Give medicine',
      new Date('2025-03-26T10:00:00Z'),
      category,
      7,
      false,
      '123e4567-e89b-12d3-a456-426614174000',
      userId
    );

    const task2 = new Task(
      'Check blood pressure',
      new Date('2025-03-26T12:00:00Z'),
      category,
      1,
      false,
      '123e4567-e89b-12d3-a456-426614174000',
      userId
    );

    await repository.create(task1);
    await repository.create(task2);

    const result = await getAllTasks.execute();

    expect(result.length).toBe(2);
    expect(result[0].getDescription()).toBe('Give medicine');
    expect(result[1].getDescription()).toBe('Check blood pressure');
  });

  it('should return an empty list if no tasks exist', async () => {
    const result = await getAllTasks.execute();

    expect(result.length).toBe(0);
  });
});
