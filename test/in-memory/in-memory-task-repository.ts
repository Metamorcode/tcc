import { TaskProps, TaskRepository } from 'src/domain/application/repositories/task-repository';
import { Task } from '../../src/domain/enterprise/entities/task';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryTaskRepository implements TaskRepository {
  constructor() {}

  async create(props: Task): Promise<void> {
    const newId = props.getId() ? props.getId() : uuidv4();
    const task = new Task(
      props.getDescription(),
      props.getEventTime(),
      props.getCategory(),
      props.getRepeatFor(),
      props.getCompleted(),
      props.getElderlyId(),
      newId,
      props.getCreateAt()
    );
    InMemoryTaskRepository.tasks.push(task);
  }
  static tasks: Task[] = [];

  // create({
  //   description,
  //   eventTime,
  //   category,
  //   repeatFor,
  //   completed,
  //   elderlyId,
  //   id,
  //   createdAt,
  // }: Task): void {
  //   const newId = id ? id : uuidv4();
  //   const task = new Task(
  //     description,
  //     eventTime,
  //     category,
  //     repeatFor,
  //     completed,
  //     elderlyId,
  //     newId,
  //     createdAt
  //   );
  //   InMemoryTaskRepository.tasks.push(task);
  // }

  update({
    description,
    eventTime,
    category,
    repeatFor,
    completed,
    elderlyId,
    id,
    createdAt,
  }: TaskProps): void {
    const task = new Task(
      description,
      eventTime,
      category,
      repeatFor,
      completed,
      elderlyId,
      id,
      createdAt
    );
    const taskIndex = InMemoryTaskRepository.tasks.findIndex((task) => {
      return task.getId() === id;
    });
    console.log(task);
    InMemoryTaskRepository.tasks[taskIndex] = task;
  }

  delete(id: string): void {
    const taskIndex = InMemoryTaskRepository.tasks.findIndex((task) => {
      return task.getId() === id;
    });

    if (taskIndex !== -1) {
      InMemoryTaskRepository.tasks.splice(taskIndex, 1);
    }
  }

  patch(id: string, completed: boolean): void {
    const taskIndex = InMemoryTaskRepository.tasks.findIndex((task) => {
      return task.getId() === id;
    });

    InMemoryTaskRepository.tasks[taskIndex].setCompleted(completed);
  }

  getAllTasks(): Promise<Task[]> {
    return Promise.resolve(InMemoryTaskRepository.tasks);
  }

  getByCategory(category: string): Task[] {
    return InMemoryTaskRepository.tasks.filter((task) => {
      return task.getCategory().getDescription() === category;
    });
  }
}
