import { AppModule } from '../src/app.module';
import { DatabaseModule } from '../src/infrastructure/database/database.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmService } from '../src/infrastructure/database/typeorm/typeorm.service';
import { CreateUserUseCase } from '../src/domain/application/use-cases/user/create-user';
import { UserRoles } from '../src/infrastructure/database/typeorm/entities/user.role';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let typeorm: TypeOrmService;
  let createUser: CreateUserUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CreateUserUseCase, TypeOrmService],
    }).compile();

    app = moduleRef.createNestApplication();

    typeorm = moduleRef.get(TypeOrmService);

    createUser = moduleRef.get(CreateUserUseCase);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await typeorm.onModuleDestroy();
  });

  describe('/api/users (POST)', () => {
    it('should create a new user', async () => {
      return await request(app.getHttpServer())
        .post('/api/users')
        .send({
          firstName: 'John',
          email: 'john.doe@example.com',
          lastName: 'Doe',
          login: 'john.doe',
          password: '123456',
          role: 'CREATOR',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.message).toBe('User created successfully');
        });
    });
  });

  describe('/api/users (GET)', () => {
    it('should return all users', async () => {
      await createUser.execute(
        'Leonardo',
        'Almonfray',
        'leo@gmail.com',
        'leo.almonfray',
        '567890123',
        UserRoles.CREATOR
      );

      return request(app.getHttpServer())
        .get('/api/users')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThanOrEqual(2);
        });
    });
  });
});
