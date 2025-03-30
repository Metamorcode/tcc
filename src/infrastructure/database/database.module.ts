import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../../config/database/database.config';

import { CategoryEntity } from './typeorm/entities/category.entity';
import { CategoryRepository } from '../../domain/application/repositories/category-repository';
import { TypeORMCategoryRepository } from './typeorm/repositories/typeorm.category.repository';

import { UserEntity } from './typeorm/entities/user.entity';
import { UserRepository } from '../../domain/application/repositories/user-repository';
import { TypeORMUserRepository } from './typeorm/repositories/typeorm.user.repository';

import { ElderlyEntity } from './typeorm/entities/elderly.entity';
import { ElderlyRepository } from '../../domain/application/repositories/elderly-repository';
import { TypeORMElderlyRepository } from './typeorm/repositories/typeorm.elderly.repository';

import { TaskEntity } from './typeorm/entities/task.entity';
import { TaskRepository } from '../../domain/application/repositories/task-repository';
import { TypeORMTaskRepository } from './typeorm/repositories/typeorm.task.repository';

import { MedicineEntity } from './typeorm/entities/medicine.entity';
import { MedicineRepository } from '../../domain/application/repositories/medicine-repository';
import { TypeORMMedicineRepository } from './typeorm/repositories/tyoeorm.medicine.repository';


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
      provide: CategoryRepository,
      useClass: TypeORMCategoryRepository,
    },
    {
      provide: ElderlyRepository,
      useClass: TypeORMElderlyRepository,
    },
    {
      provide: TaskRepository,
      useClass: TypeORMTaskRepository,
    },
    {
      provide: MedicineRepository,
      useClass: TypeORMMedicineRepository,
    },

  ],
  exports: [CategoryRepository, UserRepository, ElderlyRepository, TaskRepository, MedicineRepository],
})
export class DatabaseModule {}
