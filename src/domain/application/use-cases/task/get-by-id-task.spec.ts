import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { GetByIdTaskUseCase } from './get-by-id-task';
import { Task } from '../../../../domain/enterprise/entities/task';
import { Category } from '../../../../domain/enterprise/entities/category';
import { NotFoundException } from '@nestjs/common';

describe('Get task by id', () => {
  let repository: InMemoryTaskRepository;
  let getByIdTask: GetByIdTaskUseCase;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    getByIdTask = new GetByIdTaskUseCase(repository);
  });

  it('should be able to get a task by id', async () => {
    const category = new Category('Health', 'Health-related tasks'); // Exemplo de categoria
    const task1 = new Task(
      'Take medication',
      new Date(),
      category,
      1,
      false,
      'elderly-id-1',
      'user-id-1',
      new Date(),
      'task-id-1'
    );

    const task2 = new Task(
      'Assist with eating',
      new Date(),
      category,
      2,
      false,
      'elderly-id-2',
      'user-id-2',
      new Date(),
      'task-id-2'
    );

    await repository.create(task1);
    await repository.create(task2);

    const result = await getByIdTask.execute('task-id-1');

    expect(result).not.toBeNull();
    expect(result?.getDescription()).toBe('Take medication');
    expect(result?.getUserId()).toBe('user-id-1');
  });

  it('should throw an error if the task does not exist', async () => {
    const nonExistentId = 'non-existent-task-id';

    // Espera-se que seja lançada uma exceção NotFoundException
    await expect(getByIdTask.execute(nonExistentId)).rejects.toThrowError(NotFoundException);
  });
});
