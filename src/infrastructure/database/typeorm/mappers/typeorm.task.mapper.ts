import { raw } from 'express';
import { Task } from '../../../../domain/enterprise/entities/task';
import { TaskEntity } from '../entities/task.entity';
import { TypeORMCategoryMapper } from './typeorm.category.mapper';
import { TypeORMElderlyMapper } from './typeorm.elderly.mapper';
import { TypeORMUserMapper } from './typeorm.user.mapper';
import { UserRoles } from '../entities/user.role';

export class TypeORMTaskMapper {
  static toDomain(raw: TaskEntity): Task {
    return new Task(
      raw.description,
      raw.eventTime,
      TypeORMCategoryMapper.toDomain(raw.category),
      raw.repeatFor,
      raw.completed,
      raw.elderly.id
    );
  }

  static toTypeORM(task: Task): TaskEntity {
    const taskEntity = new TaskEntity();
    //taskEntity.id = task.id;
    taskEntity.description = task.getDescription();
    taskEntity.eventTime = task.getEventTime();
    taskEntity.category = TypeORMCategoryMapper.toTypeORM(task.getCategory());
    taskEntity.repeatFor = task.getRepeatFor();
    taskEntity.completed = task.getCompleted();
    taskEntity.elderly = {
      id: task.getElderlyId(),
      birthDate: new Date(),
      firstName: '',
      lastName: '',
      tasks: [],
    }; //TODO rever o elderly
    taskEntity.user = {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      login: '',
      password: '',
      role: UserRoles.CREATOR,
      tasks: [],
    }; //TODO rever user dentro de task
    return taskEntity;
  }
}
