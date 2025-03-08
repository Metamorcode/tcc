import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../../config/database/database.config';

import { CategoryEntity } from './typeorm/entities/category.entity';
import { ElderlyEntity } from './typeorm/entities/elderly.entity';
import { TaskEntity } from './typeorm/entities/task.entity';
import { MedicineEntity } from './typeorm/entities/medicine.entity';

import { UserEntity } from './typeorm/entities/user.entity';
import { UserRepository } from '../../domain/application/repositories/user-repository';
import { TypeORMUserRepository } from './typeorm/repositories/typeorm.user.repository';

import { TaskRepository } from '../../domain/application/repositories/task-repository';
import { TypeORMTaskRepository } from './typeorm/repositories/typeorm.task.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([
      CategoryEntity,
      ElderlyEntity,
      UserEntity,
      TaskEntity,
      MedicineEntity,
    ]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeORMUserRepository,
    },
    {
      provide: TaskRepository,
      useClass: TypeORMTaskRepository,
    },
  ],
  exports: [UserRepository, TaskRepository],
})
export class DatabaseModule {}
