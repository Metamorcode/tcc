import { InMemoryTaskRepository } from '../../../../../test/in-memory/in-memory-task-repository';
import { DeleteTaskUseCase } from './delete-task';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../../../domain/enterprise/entities/task';
import { Category } from '../../../../domain/enterprise/entities/category';
import { NotFoundException } from '@nestjs/common';

describe('Delete a Task', () => {
  let repository: InMemoryTaskRepository;
  let deleteTask: DeleteTaskUseCase;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
    deleteTask = new DeleteTaskUseCase(repository);
  });

  it('should be able to delete a task', async () => {
    const id = uuidv4(); // ID gerado para a tarefa
    const userId = uuidv4(); // Adicionando userId aqui
    const category = new Category('1', 'Diário');

    const task = new Task(
      'Check blood pressure',
      new Date('2025-03-26T12:00:00Z'),
      category,
      1,
      false,
      '123e4567-e89b-12d3-a456-426614174000',
      userId
    );

    // Criação da tarefa
    await repository.create(task);

    // Verifica se a tarefa foi criada
    const createdTask = await repository.getById(task.getId()); // Usando o ID da tarefa criada
    expect(createdTask).not.toBeNull();

    // Exclui a tarefa
    await deleteTask.execute(task.getId()); // Exclui utilizando o ID correto

    // Verifica se a tarefa foi deletada
    const deletedTask = await repository.getById(task.getId());
    expect(deletedTask).toBeNull();
  });

  it('should throw an error if the task does not exist', async () => {
    const id = uuidv4(); // ID de uma tarefa que não existe

    // Verifica se o erro é lançado quando não encontrar a tarefa
    await expect(deleteTask.execute(id)).rejects.toThrowError(NotFoundException);
    await expect(deleteTask.execute(id)).rejects.toThrowError('Task not found');
  });
});
