import { Task } from '../../../../domain/enterprise/entities/task';
import { TaskEntity } from '../entities/task.entity';
import { TypeORMCategoryMapper } from './typeorm.category.mapper';

export class TypeORMTaskMapper {
  static toDomain(raw: TaskEntity): Task {
    return new Task(
      raw.description,
      raw.eventTime,
      TypeORMCategoryMapper.toDomain(raw.category),
      raw.repeatFor,
      raw.completed,
      raw.elderly.id, 
      raw.user.id 
    );
  }

  static toTypeORM(task: Task): TaskEntity {
    const taskEntity = new TaskEntity();
    taskEntity.description = task.getDescription();
    taskEntity.eventTime = task.getEventTime();
    taskEntity.category = TypeORMCategoryMapper.toTypeORM(task.getCategory());
    taskEntity.repeatFor = task.getRepeatFor();
    taskEntity.completed = task.getCompleted();
  
    taskEntity.elderly = { id: task.getElderlyId() } as any;
    taskEntity.user = { id: task.getUserId() } as any;

    return taskEntity;
  }
}
