import { AppModule } from '../src/app.module';
import { DatabaseModule } from '../src/infrastructure/database/database.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmService } from '../src/infrastructure/database/typeorm/typeorm.service';

import { CreateTaskUseCase } from '../src/domain/application/use-cases/task/create-task';
import { DeleteTaskUseCase } from '../src/domain/application/use-cases/task/delete-task';
import { GetByIdTaskUseCase } from '../src/domain/application/use-cases/task/get-by-id-task';
import { GetAllTasksUseCase } from '../src/domain/application/use-cases/task/get-all-tasks';
import { UpdateTaskUseCase } from '../src/domain/application/use-cases/task/update-task';
import { CategoryDto } from '../src/infrastructure/http/controllers/dto/category.dto';

import { CreateUserUseCase } from '../src/domain/application/use-cases/user/create-user';
import { CreateElderlyUseCase } from '../src/domain/application/use-cases/elderly/create-elderly';
import { TypeORMUserRepository } from '../src/infrastructure/database/typeorm/repositories/typeorm.user.repository';
import { User } from '../src/domain/enterprise/entities/user';
import { UserRoles } from '../src/domain/enterprise/entities/user.role';
import { TypeORMElderlyRepository } from '../src/infrastructure/database/typeorm/repositories/typeorm.elderly.repository';
import { Elderly } from '../src/domain/enterprise/entities/elderly';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let typeorm: TypeOrmService; 
  let createTask: CreateTaskUseCase;
  let deleteTask: DeleteTaskUseCase;
  let updateTask: UpdateTaskUseCase;
  let getByIdTask: GetByIdTaskUseCase;
  let getAllTasks: GetAllTasksUseCase;
  let typeormUserRepository: TypeORMUserRepository;
  let typeormElderlyRepository: TypeORMElderlyRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        CreateTaskUseCase,
        TypeOrmService,
        GetByIdTaskUseCase,
        DeleteTaskUseCase,
        GetAllTasksUseCase,
        UpdateTaskUseCase,
        TypeORMUserRepository,
        TypeORMElderlyRepository,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    typeorm = moduleRef.get(TypeOrmService);

    createTask = moduleRef.get(CreateTaskUseCase);
    deleteTask = moduleRef.get(DeleteTaskUseCase);
    getByIdTask = moduleRef.get(GetByIdTaskUseCase);
    getAllTasks = moduleRef.get(GetAllTasksUseCase);
    updateTask = moduleRef.get(UpdateTaskUseCase);
    typeormUserRepository = moduleRef.get(TypeORMUserRepository);
    typeormElderlyRepository = moduleRef.get(TypeORMElderlyRepository);

    await app.init();
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    await app.close();
  });

  describe('/api/tasks (POST)', () => {
    it('should create a new task', async () => {
      const user = await typeormUserRepository.create(
        new User(
          'Mary',
          'Jane',
          'mary.jane@example.com',
          'maryJ',
          'spiderMan2002',
          UserRoles.CREATOR
        )
      );
      const elderly = await typeormElderlyRepository.create(
        new Elderly('John', 'Doe', new Date(), '')
      )
      return await request(app.getHttpServer())
        .post('/api/tasks')
        .send({
          description: 'Take medication',
          eventTime: new Date(),
          category: 'Daily',
          repeatFor: '1',
          completed: false,
          elderlyId: elderly.getId(),
          userId: user.getId(),
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.message).toBe('Task created successfully');
        });
    });
  });

  // describe('/api/tasks (GET)', () => {
  //   it('should return all tasks', async () => {
  //     const categoryDto = new CategoryDto();
  //     categoryDto.id = '1';
  //     categoryDto.description = 'Diário';

  //     await createTask.execute(
  //       'Take medication',
  //       new Date(),
  //       categoryDto,
  //       1,
  //       false,
  //       'some-elderly-id',
  //       'some-user-id'
  //     );

  //     return request(app.getHttpServer())
  //       .get('/api/tasks')
  //       .expect(200)
  //       .expect((res) => {
  //         expect(Array.isArray(res.body)).toBe(true);
  //         expect(res.body.length).toBeGreaterThanOrEqual(1);
  //       });
  //   });
  // });

  // describe('/api/tasks/:id (GET)', () => {
  //   it('should retrieve a task by ID', async () => {
  //     const createRes = await request(app.getHttpServer())
  //       .post('/api/tasks')
  //       .send({
  //         description: 'Take medication',
  //         eventTime: new Date(),
  //         category: '1',
  //         repeatFor: 'Daily',
  //         completed: false,
  //         elderlyId: 'some-elderly-id',
  //         userId: 'some-user-id',
  //       })
  //       .expect(201);

  //     const createdTask = createRes.body.task;

  //     const getRes = await request(app.getHttpServer())
  //       .get(`/api/tasks/${createdTask.id}`)
  //       .expect(200);

  //     expect(getRes.body.task.id).toBe(createdTask.id);
  //     expect(getRes.body.task.description).toBe('Take medication');
  //     expect(getRes.body.task.completed).toBe(false);
  //   });
  // });

  // describe('/api/tasks/:id (DELETE)', () => {
  //   it('should delete a task by ID', async () => {
  //     const createRes = await request(app.getHttpServer())
  //       .post('/api/tasks')
  //       .send({
  //         description: 'Take medication',
  //         eventTime: new Date(),
  //         category: 'Daily',
  //         repeatFor: 'Daily',
  //         completed: false,
  //         elderlyId: 'some-elderly-id',
  //         userId: 'some-user-id',
  //       })
  //       .expect(201);

  //     const createdTask = createRes.body.task;

  //     return await request(app.getHttpServer())
  //       .delete(`/api/tasks/${createdTask.id}`)
  //       .expect(200)
  //       .expect((res) => {
  //         expect(res.body.message).toBe('Task deleted successfully');
  //       });
  //   });
  // });

  // describe('/api/tasks/:id (PUT)', () => {
  //   it('should update a task by ID', async () => {
  //     const createRes = await request(app.getHttpServer())
  //       .post('/api/tasks')
  //       .send({
  //         description: 'Take medication',
  //         eventTime: new Date(),
  //         category: 'Daily',
  //         repeatFor: 'Daily',
  //         completed: false,
  //         elderlyId: 'some-elderly-id',
  //         userId: 'some-user-id',
  //       })
  //       .expect(201);

  //     const createdTask = createRes.body.task;

  //     const updateRes = await request(app.getHttpServer())
  //       .put(`/api/tasks/${createdTask.id}`)
  //       .send({
  //         description: 'Take a walk',
  //         eventTime: new Date(),
  //         category: 'Daily',
  //         repeatFor: 'Daily',
  //         completed: true,
  //         elderlyId: 'some-elderly-id',
  //         userId: 'some-user-id',
  //       })
  //       .expect(200);

  //     expect(updateRes.body.message).toBe('Task updated successfully');

  //     const getRes = await request(app.getHttpServer())
  //       .get(`/api/tasks/${createdTask.id}`)
  //       .expect(200);

  //     expect(getRes.body.task.description).toBe('Take a walk');
  //     expect(getRes.body.task.completed).toBe(true);
  //   });
  // });
});
