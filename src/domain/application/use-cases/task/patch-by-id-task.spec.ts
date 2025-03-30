import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { PatchTaskUseCase } from './patch-by-id-task';
import { Category } from '../../../enterprise/entities/category';
import { Task } from '../../../enterprise/entities/task';
import { v4 as uuidv4 } from 'uuid';

describe('Patch a Task status', () => {
  let repository: InMemoryTaskRepository;
  let patchTask: PatchTaskUseCase;
  let category: Category;
  let userId: string;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    patchTask = new PatchTaskUseCase(repository);
    category = new Category('1', 'Diário');
    userId = uuidv4();  // Gerando userId
  });

  it('should be able to patch the attribute task completed', async () => {
    const task = new Task(
      'Trocar o curativo das costas',
      new Date('2025-02-25T09:00:00.000Z'),
      category,
      14,
      false,
      '123',  // id do idoso
      userId,  // Passando userId
      new Date()
    );

    // Cria a tarefa no repositório
    await repository.create(task);

    // Obtém o ID da tarefa criada
    const taskId = task.getId();

    // Agora passa o ID correto para o patch
    await patchTask.execute(taskId, true);

    // Verifica se a tarefa foi atualizada corretamente
    const updatedTask = await repository.getById(taskId);

    expect(updatedTask?.getCompleted()).toBe(true);
    expect(updatedTask?.getDescription()).toBe('Trocar o curativo das costas');
  });
});
