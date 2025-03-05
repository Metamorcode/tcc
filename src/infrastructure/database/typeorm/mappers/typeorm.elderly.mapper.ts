import { ElderlyEntity } from '../entities/elderly.entity';
import { Elderly } from '../../../../domain/enterprise/entities/elderly';
import { TypeORMTaskMapper } from './typeorm.task.mapper';

export class TypeORMElderlyMapper {
  static toDomain(raw: ElderlyEntity): Elderly {
    return new Elderly(
      raw.firstName,
      raw.lastName,
      raw.birthDate,
    );
  }

  static toTypeORM(elderly: Elderly): ElderlyEntity {
    const elderlyEntity = new ElderlyEntity();
    elderlyEntity.firstName = elderly.getFirstName();
    elderlyEntity.lastName = elderly.getLastName();
    elderlyEntity.birthDate = elderly.getBirth();

    return elderlyEntity;
  }
}
