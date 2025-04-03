import { Elderly } from '../../../../domain/enterprise/entities/elderly';
import { TypeORMTaskMapper } from './typeorm.task.mapper';
import { ElderlyEntity } from '../entities/elderly.entity';
import { validate as isUUID } from 'uuid';

export class TypeORMElderlyMapper {
  static toDomain(raw: ElderlyEntity): Elderly {
    const elderly = new Elderly(
      raw.firstName,
      raw.lastName,
      raw.birthDate,
      raw.id,
      raw.userFamily
    );

    raw.tasks?.forEach((taskEntity) => {
      const task = TypeORMTaskMapper.toDomain(taskEntity);
      elderly.addTask({
        description: task.getDescription(),
        eventTime: task.getEventTime(),
        category: task.getCategory(),
        repeatFor: task.getRepeatFor(),
        completed: task.getCompleted(),
        elderlyId: elderly.getId(),
      });
      const lastTask = elderly.getTasks()[elderly.getTasks().length - 1];
      lastTask.updateStatus(task.getCompleted());
    });

    return elderly;
  }

  static toTypeORM(elderly: Elderly): ElderlyEntity {
    const elderlyEntity = new ElderlyEntity();
    if (elderly.getId() && isUUID(elderly.getId())) {
      elderlyEntity.id = elderly.getId()!;
    }
    elderlyEntity.firstName = elderly.getFirstName();
    elderlyEntity.lastName = elderly.getLastName();
    elderlyEntity.birthDate = elderly.getBirthDate(); 
    elderlyEntity.userFamily = elderly.getUserFamily();

    elderlyEntity.tasks = elderly.getTasks().map((task) => TypeORMTaskMapper.toTypeORM(task));

    return elderlyEntity;
  }
}
