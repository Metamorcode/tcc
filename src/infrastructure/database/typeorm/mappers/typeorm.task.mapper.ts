import { Task } from '../../../../domain/enterprise/entities/task';
import { TaskEntity } from '../entities/task.entity';
import { TypeORMCategoryMapper } from './typeorm.category.mapper';
import { TypeORMElderlyMapper } from './typeorm.elderly.mapper';
import { TypeORMUserMapper } from './typeorm.user.mapper';

export class TypeORMTaskMapper {
  static toDomain(raw: TaskEntity): Task {
    return new Task({
      id: raw.id,
      description: raw.description,
      eventTime: raw.eventTime,
      category: TypeORMCategoryMapper.toDomain(raw.category),
      repeatFor: raw.repeatFor,
      completed: raw.completed,
      elderly: TypeORMElderlyMapper.toDomain(raw.elderly),
      user: TypeORMUserMapper.toDomain(raw.user),
    });
  }

  static toTypeORM(task: Task): TaskEntity {
    const taskEntity = new TaskEntity();
    taskEntity.id = task.id;
    taskEntity.description = task.description;
    taskEntity.eventTime = task.eventTime;
    taskEntity.category = TypeORMCategoryMapper.toTypeORM(task.category);
    taskEntity.repeatFor = task.repeatFor;
    taskEntity.completed = task.completed;
    taskEntity.elderly = TypeORMElderlyMapper.toTypeORM(task.elderly);
    taskEntity.user = TypeORMUserMapper.toTypeORM(task.user);
    return taskEntity;
  }
}
