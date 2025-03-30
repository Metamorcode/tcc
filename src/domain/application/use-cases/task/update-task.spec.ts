import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { UpdateTaskUseCase } from './update-task';
import { Task } from '../../../../domain/enterprise/entities/task';
import { UpdateTaskDto } from '../../../../infrastructure/http/controllers/dto/update-task-dto';
import { Category } from '../../../../domain/enterprise/entities/category';
import { v4 as uuidv4 } from 'uuid';

describe('Update a Task', () => {
  let repository: InMemoryTaskRepository;
  let updateTask: UpdateTaskUseCase;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    updateTask = new UpdateTaskUseCase(repository);
  });

  it('should be able to update a task', async () => {
    const category = new Category('1', 'Diário');
    const id = uuidv4();
    
    const task = new Task(
      'Take medicine',
      new Date('2025-03-25T10:00:00'),
      category,
      1,
      false,
      'elderly-id-123',
      'user-id-456',
      new Date(),
      id
    );

    await repository.create(task);
    const createdTask = await repository.getById(id);
    expect(createdTask).not.toBeNull();

    const updateTaskDto: UpdateTaskDto = {
      description: 'Take medicine at 2 PM',
      eventTime: new Date('2025-03-25T14:00:00'),
      category: category,
      repeatFor: 2,
      completed: true,
      elderlyId: 'elderly-id-456',
      userId: 'user-id-789',
    };

    const updatedTask = await updateTask.execute(id, updateTaskDto);

    expect(updatedTask).not.toBeNull();
    expect(updatedTask?.getDescription()).toBe('Take medicine at 2 PM');
    expect(updatedTask?.getEventTime()).toEqual(new Date('2025-03-25T14:00:00'));
    expect(updatedTask?.getCategory()).toEqual(category);
    expect(updatedTask?.getRepeatFor()).toBe(2);
    expect(updatedTask?.getCompleted()).toBe(true);
    expect(updatedTask?.getElderlyId()).toBe('elderly-id-456');
    expect(updatedTask?.getUserId()).toBe('user-id-789');
  });

  it('should throw an error if the task is not found', async () => {
    const id = uuidv4();
    const updateTaskDto: UpdateTaskDto = {
      description: 'Take medicine at 2 PM',
      eventTime: new Date('2025-03-25T14:00:00'),
      category: new Category('2', 'Mensal'),
      repeatFor: 2,
      completed: true,
      elderlyId: 'elderly-id-456',
      userId: 'user-id-789',
    };

    await expect(updateTask.execute(id, updateTaskDto)).rejects.toThrowError('Task not found');
  });
});