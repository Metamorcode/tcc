import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { CreateTaskUseCase } from './create-task';
import { CategoryDto } from '../../../../infrastructure/http/controllers/dto/category.dto';
import { validate as isUUID } from 'uuid';

describe('Create Task', () => {
  const repository = new InMemoryTaskRepository();

  it('should be able to create a new task', async () => {
    const createTask = new CreateTaskUseCase(repository);
    
    // Agora criando um CategoryDto ao invés de um Category
    const categoryDto = new CategoryDto();
    categoryDto.id = '1';
    categoryDto.description = 'Diário';

    const createdTask = await createTask.execute(
      'Give medicine',
      new Date('2025-03-26T10:00:00Z'),
      categoryDto,  // Passando CategoryDto no lugar de Category
      2,
      false,
      '123e4567-e89b-12d3-a456-426614174000',
      'user-id-1234'
    );

    expect((await repository.getAllTasks()).length).toEqual(1);
    expect(isUUID(createdTask.getId()!)).toBe(true);
    expect(createdTask.getDescription()).toBe('Give medicine');
    expect(createdTask.getEventTime()).toEqual(new Date('2025-03-26T10:00:00Z'));
    expect(createdTask.getCategory().getId()).toBe('1');
    expect(createdTask.getCategory().getDescription()).toBe('Diário');
    expect(createdTask.getRepeatFor()).toBe(2);
    expect(createdTask.getCompleted()).toBe(false);
    expect(createdTask.getElderlyId()).toBe('123e4567-e89b-12d3-a456-426614174000');
    expect(createdTask.getUserId()).toBe('user-id-1234');
  });
});
