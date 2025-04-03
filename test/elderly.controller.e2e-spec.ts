import { AppModule } from '../src/app.module';
import { DatabaseModule } from '../src/infrastructure/database/database.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmService } from '../src/infrastructure/database/typeorm/typeorm.service';

import { CreateElderlyUseCase } from '../src/domain/application/use-cases/elderly/create-elderly';
import { GetByIdElderlyUseCase } from '../src/domain/application/use-cases/elderly/get-by-id-elderly';
import { GetAllElderlyUseCase } from '../src/domain/application/use-cases/elderly/get-all-elderly';
import { UpdateElderlyUseCase } from '../src/domain/application/use-cases/elderly/update-elderly';
import { DeleteElderlyUseCase } from '../src/domain/application/use-cases/elderly/delete-elderly';

import { CreateUserUseCase } from '../src/domain/application/use-cases/user/create-user';
import { UserRoles } from '../src/infrastructure/database/typeorm/entities/user.role';

describe('ElderlyController (e2e)', () => {
  let app: INestApplication;
  let typeorm: TypeOrmService;

  let createElderly: CreateElderlyUseCase;
  let getByIdElderly: GetByIdElderlyUseCase;
  let getAllElderly: GetAllElderlyUseCase;
  let updateElderly: UpdateElderlyUseCase;
  let deleteElderly: DeleteElderlyUseCase;

  let createUser: CreateUserUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        TypeOrmService,

        CreateElderlyUseCase,
        GetByIdElderlyUseCase,
        GetAllElderlyUseCase,
        UpdateElderlyUseCase,
        DeleteElderlyUseCase,

        CreateUserUseCase,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    typeorm = moduleRef.get(TypeOrmService);
    createElderly = moduleRef.get(CreateElderlyUseCase);
    getByIdElderly = moduleRef.get(GetByIdElderlyUseCase);
    getAllElderly = moduleRef.get(GetAllElderlyUseCase);
    updateElderly = moduleRef.get(UpdateElderlyUseCase);
    deleteElderly = moduleRef.get(DeleteElderlyUseCase);

    createUser = moduleRef.get(CreateUserUseCase);

    await app.init();
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    await app.close();
  });

  describe('/api/elderly (POST)', () => {
    it('should create a new elderly person', async () => {
      const user = await createUser.execute(
        'Mary',
        'Jane',
        `mary.jane+${Date.now()}@example.com`, // Garantir um email único
        `maryJ${Date.now()}`, // Garantir um login único
        'spiderMan2002',
        UserRoles.CREATOR
      );

      return request(app.getHttpServer())
        .post('/api/elderly')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          birthDate: '1945-06-15',
          userFamily: user.getId(),
        })
        .expect(201)
        .expect((res) => {
          console.log('Resposta da API:', res.body);
          expect(res.body.message).toBe('Elderly person created successfully');
          expect(res.body.elderly.firstName).toBe('John');
          expect(res.body.elderly.lastName).toBe('Doe');
        });
    });
  });

  describe('/api/elderly/:id (GET)', () => {
    it('should retrieve an elderly person by ID', async () => {
      const user = await createUser.execute(
        'Mary',
        'Jane',
        `mary.jane+${Date.now()}@example.com`, // Garantir um email único
        `maryJ${Date.now()}`, // Garantir um login único
        'spiderMan2002',
        UserRoles.CREATOR
      );

      const elderly = await createElderly.execute(
        'Jane',
        'Smith',
        new Date('1950-02-20'),
        user.getId()
      );
      console.log('Idoso criado:', elderly);
      return request(app.getHttpServer())
        .get(`/api/elderly/${elderly.getId()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe('Elderly person retrieved successfully');
          expect(res.body.elderly._firstName).toBe('Jane');
          expect(res.body.elderly._lastName).toBe('Smith');
        });
    });
  });

  describe('/api/elderly/:id (PUT)', () => {
    it('should update an elderly person', async () => {
      const user = await createUser.execute(
        'Mary',
        'Jane',
        `mary.jane+${Date.now()}@example.com`,
        `maryJ${Date.now()}`,
        'spiderMan2002',
        UserRoles.CREATOR
      );

      const elderly = await request(app.getHttpServer())
        .post('/api/elderly')
        .send({
          firstName: 'Alice',
          lastName: 'Johnson',
          birthDate: new Date('1960-09-10'),
          userFamily: user.getId(),
        })
        .expect(201);

      const createdElderly = elderly.body.elderly;

      console.log('Idoso criado PUT:', createdElderly);

      const foundElderly = await request(app.getHttpServer())
        .get(`/api/elderly/${createdElderly.id}`)
        .expect(200);

      console.log('Idoso encontrado antes do PUT:', foundElderly.body.elderly._userFamily);

      const updateRes = await request(app.getHttpServer())
        .put(`/api/elderly/${foundElderly.body.elderly._userFamily}`)
        .send({
          firstName: 'Alice',
          lastName: 'Brown',
          birthDate: new Date('1960-09-10'),
          userFamily: user.getId(),
        })
        .expect(200);
      expect(updateRes.body.message).toBe('Elderly person updated successfully');
      expect(updateRes.body.elderly.lastName).toBe('Brown');
    });
  });

  describe('/api/elderly/:id (DELETE)', () => {
    it('should delete an elderly person', async () => {
      const user = await createUser.execute(
        'Mary',
        'Jane',
        `mary.jane+${Date.now()}@example.com`, // Garantir um email único
        `maryJ${Date.now()}`, // Garantir um login único
        'spiderMan2002',
        UserRoles.CREATOR
      );

      const elderly = await createElderly.execute(
        'Robert',
        'Wilson',
        new Date('1940-12-25'),
        user.getId()
      );

      return request(app.getHttpServer())
        .delete(`/api/elderly/${elderly.getId()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe('Elderly person deleted successfully');
        });
    });
  });

  // describe('/api/elderly/:id (GET) - Not Found', () => {
  //   it('should return 404 if elderly person is not found', async () => {
  //     return request(app.getHttpServer())
  //       .get('/api/elderly/invalid-id')
  //       .expect(404)
  //       .expect((res) => {
  //         expect(res.body.message).toBe('Elderly person not found');
  //       });
  //   });
  // });
});
