import { Task } from '../../src/domain/enterprise/entities/task';
import { TaskRepository } from 'src/domain/application/repositories/task-repository';
import { NotFoundException } from '@nestjs/common';

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async create(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async update(task: Task): Promise<Task> {
    const taskIndex = this.tasks.findIndex((t) => t.getId() === task.getId());

    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }

    this.tasks[taskIndex] = task;
    return task;
  }

  async delete(id: string): Promise<boolean> {
    const taskIndex = this.tasks.findIndex((task) => task.getId() === id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }
    this.tasks.splice(taskIndex, 1);
    return true;
  }

  async getById(id: string): Promise<Task | null> {
    const task = this.tasks.find((task) => task.getId() === id);
    return task || null;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  // PATCH agora retorna booleano
  async patch(id: string, completed: boolean): Promise<boolean> {
    const task = this.tasks.find((task) => task.getId() === id);
    if (!task) {
      return false; // Se a tarefa não for encontrada, retorna false
    }

    task.setCompleted(completed); // Atualiza o status de completado
    return true; // Retorna true se a tarefa foi encontrada e o status atualizado
  }

  reset(): void {
    this.tasks = [];
  }
}
