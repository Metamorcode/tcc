import { User } from '../../../../domain/enterprise/entities/user';
import { TypeORMTaskMapper } from './typeorm.task.mapper';
import { UserEntity } from '../entities/user.entity';
import { validate as isUUID } from 'uuid';

export class TypeORMUserMapper {
  static toDomain(raw: UserEntity): User {
    const user = new User(
      raw.firstName,
      raw.lastName,
      raw.email,
      raw.login,
      raw.password,
      raw.role,
      raw.id
    );
    raw.tasks?.forEach((taskEntity) => {
      const task = TypeORMTaskMapper.toDomain(taskEntity);
      user.addTask({
        description: task.getDescription(),
        eventTime: task.getEventTime(),
        category: task.getCategory(),
        repeatFor: task.getRepeatFor(),
        completed: task.getCompleted(),
        elderlyId: task.getElderlyId(),
        userId: user.getId(),
      });
      const lastTask = user.getTasks()[user.getTasks().length - 1];
      lastTask.updateStatus(task.getCompleted());
    });

    return user;
  }

  static toTypeORM(user: User): UserEntity {
    const userEntity = new UserEntity();
    if (user.getId() && isUUID(user.getId())) {
      userEntity.id = user.getId()!;
    }
    userEntity.firstName = user.getFirstName();
    userEntity.lastName = user.getLastName();
    userEntity.email = user.getEmail();
    userEntity.login = user.getLogin();
    userEntity.password = user.getPassword();
    userEntity.role = user.getRole();
    userEntity.tasks = user.getTasks().map((task) => TypeORMTaskMapper.toTypeORM(task));
    return userEntity;
  }
}
