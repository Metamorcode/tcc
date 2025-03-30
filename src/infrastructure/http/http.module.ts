import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { CategoryController } from './controllers/category.controller';
import { ElderlyController } from './controllers/elderly.controller';
import { UserController } from './controllers/user.controller';
import { TaskController } from './controllers/task.controller';
import { MedicineController } from './controllers/medicine.controller';

import { CreateCategoryUseCase } from '../../domain/application/use-cases/category/create-category';
import { GetByCategoryDescriptionUseCase } from '../../domain/application/use-cases/category/get-by-description-category';

import { CreateElderlyUseCase } from '../..//domain/application/use-cases/elderly/create-elderly';
import { GetByIdElderlyUseCase } from '../..//domain/application/use-cases/elderly/get-by-id-elderly';
import { GetAllElderlyUseCase } from '../..//domain/application/use-cases/elderly/get-all-elderly';
import { UpdateElderlyUseCase } from '../..//domain/application/use-cases/elderly/update-elderly';
import { DeleteElderlyUseCase } from '../..//domain/application/use-cases/elderly/delete-elderly';

import { CreateUserUseCase } from '../../domain/application/use-cases/user/create-user';
import { GetByIdUserUseCase } from '../../domain/application/use-cases/user/get-by-id-user';
import { GetAllUsersUseCase } from '../../domain/application/use-cases/user/get-all-users';
import { UpdateUserUseCase } from '../../domain/application/use-cases/user/update-user';
import { DeleteUserUseCase } from '../../domain/application/use-cases/user/delete-user';

import { CreateTaskUseCase } from '../../domain/application/use-cases/task/create-task';
import { GetByIdTaskUseCase } from '../../domain/application/use-cases/task/get-by-id-task';
import { GetAllTasksUseCase } from '../../domain/application/use-cases/task/get-all-tasks';
import { UpdateTaskUseCase } from '../../domain/application/use-cases/task/update-task';
import { DeleteTaskUseCase } from '../../domain/application/use-cases/task/delete-task';

import { CreateMedicineUseCase } from '../../domain/application/use-cases/medicine/create-medicine';
import { GetByIdMedicineUseCase } from '../../domain/application/use-cases/medicine/get-by-id-medicine';
import { GetAllMedicinesUseCase } from '../../domain/application/use-cases/medicine/get-all-medicines';
import { UpdateMedicineUseCase } from '../../domain/application/use-cases/medicine/update-medicine';
import { DeleteMedicineUseCase } from '../../domain/application/use-cases/medicine/delete-medicine';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController, UserController, ElderlyController, TaskController, MedicineController],
  providers: [
    CreateCategoryUseCase,
    GetByCategoryDescriptionUseCase,

    CreateUserUseCase,
    GetByIdUserUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    
    CreateElderlyUseCase,
    GetByIdElderlyUseCase,
    GetAllElderlyUseCase,
    UpdateElderlyUseCase,
    DeleteElderlyUseCase,

    CreateTaskUseCase,
    GetByIdTaskUseCase,
    GetAllTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    
    CreateMedicineUseCase,
    GetByIdMedicineUseCase,
    GetAllMedicinesUseCase,
    UpdateMedicineUseCase,
    DeleteMedicineUseCase,    
  ],
})
export class HttpModule {}
