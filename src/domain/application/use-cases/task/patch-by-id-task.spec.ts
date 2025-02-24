import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { PatchTaskUseCase } from './patch-by-id-task';
import { Category } from '../../../enterprise/entities/category';
import { v4 as uuidv4 } from 'uuid';

describe('Patch a Task status', () => {
  const repository = new InMemoryTaskRepository();

  it('should be able to patch the atribute task completed', () => {
    const patchTask = new PatchTaskUseCase(repository);

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

    patchTask.execute(id, true);
    console.log(InMemoryTaskRepository.tasks[0]);

    expect(InMemoryTaskRepository.tasks[0].getCompleted()).toEqual(true);
    expect(InMemoryTaskRepository.tasks[0].getDescription()).toEqual(
      'Trocar o curativo das costas'
    );
  });
});
