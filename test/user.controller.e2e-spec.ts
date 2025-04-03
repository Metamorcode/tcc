import { AppModule } from '../src/app.module';
import { DatabaseModule } from '../src/infrastructure/database/database.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmService } from '../src/infrastructure/database/typeorm/typeorm.service';

import { UserRoles } from '../src/infrastructure/database/typeorm/entities/user.role';
import { CreateUserUseCase } from '../src/domain/application/use-cases/user/create-user';
import { DeleteUserUseCase } from '../src/domain/application/use-cases/user/delete-user';
import { GetByIdUserUseCase } from '../src/domain/application/use-cases/user/get-by-id-user';
import { GetAllUsersUseCase } from '../src/domain/application/use-cases/user/get-all-users';
import { UpdateUserUseCase } from '../src/domain/application/use-cases/user/update-user';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let typeorm: TypeOrmService;
  let createUser: CreateUserUseCase;
  let deleteUser: DeleteUserUseCase;
  let updateUser: UpdateUserUseCase;
  let getByIdUser: GetByIdUserUseCase;
  let getAllUsers: GetAllUsersUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        CreateUserUseCase,
        DeleteUserUseCase,
        TypeOrmService,
        GetByIdUserUseCase,
        GetAllUsersUseCase,
        UpdateUserUseCase,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    typeorm = moduleRef.get(TypeOrmService);

    createUser = moduleRef.get(CreateUserUseCase);
    deleteUser = moduleRef.get(DeleteUserUseCase);
    getByIdUser = moduleRef.get(GetByIdUserUseCase);
    getAllUsers = moduleRef.get(GetAllUsersUseCase);
    updateUser = moduleRef.get(UpdateUserUseCase);

    await app.init();
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    await app.close();
  });

  describe('/api/users (POST)', () => {
    it('should create a new user', async () => {
      return await request(app.getHttpServer())
        .post('/api/users')
        .send({
          firstName: 'Mary',
          lastName: 'Jane',
          email: 'mary.jane@example.com',
          login: 'maryJ',
          password: 'spiderMan2002',
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

  describe('/api/users/:id (GET)', () => {
    it('should retrieve a user by ID', async () => {
      // Criando um usuário
      const createRes = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          firstName: 'Peter',
          lastName: 'Parker',
          email: 'p.p@example.com',
          login: 'peterP',
          password: 'MaryJane8',
          role: 'CREATOR',
        })
        .expect(201);

      const createdUser = createRes.body.user;
      console.log('log create', createdUser.id);

      // Recuperando o usuário pelo ID
      const getRes = await request(app.getHttpServer())
        .get(`/api/users/${createdUser.id}`) // Usando o ID retornado no cadastro
        .expect(200);

      console.log('log get', getRes.body.user._id);

      // Verificando a resposta
      expect(getRes.body.user._id).toBe(createdUser.id); // Alterando para acessar corretamente o campo `id`
      expect(getRes.body.user._firstName).toBe('Peter');
      expect(getRes.body.user._lastName).toBe('Parker');
      expect(getRes.body.user._email).toBe('p.p@example.com'); // Verificando também o email
      expect(getRes.body.user._login).toBe('peterP'); // Verificando o login

      console.log('Get Response:', getRes.body); // Log para depuração
    });
  });

  describe('/api/users/:id (DELETE)', () => {
    it('should create, get and delete a user by ID in the same test', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          firstName: 'John',
          lastName: 'Parker',
          email: 'jp@example.com',
          login: 'jparker',
          password: 'itsnotmyproblem',
          role: 'CREATOR',
        })
        .expect(201);

      const createdUser = createRes.body.user;
      console.log('log delete', createdUser.id);

      const getRes = await request(app.getHttpServer())
        .get(`/api/users/${createdUser.id}`)
        .expect(200);

      console.log('log id delete get', getRes.body.user._id);

      return await request(app.getHttpServer())
        .delete(`/api/users/${getRes.body.user._id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe('User deleted successfully');
        });
    });
  });

  describe('/api/users/:id (PUT)', () => {
    it('should update a user by ID', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          firstName: 'Bruce',
          lastName: 'Wayne',
          email: 'bruce@example.com',
          login: 'batman',
          password: 'imBatman',
          role: 'CREATOR',
        })
        .expect(201);

      const createdUser = createRes.body.user;
      console.log('Dados do PUT', createRes.body.user);
      console.log('ID do PUT', createdUser.id);

      // Atualizar o usuário
      const updateRes = await request(app.getHttpServer())
        .put(`/api/users/${createdUser.id}`)
        .send({
          firstName: 'Bruce',
          lastName: 'Banner',
          email: 'bruce.banner@example.com',
          login: 'hulk',
          password: 'dontGetMeAngry',
          role: 'CREATOR',
        })
        .expect(200);

      expect(updateRes.body.message).toBe('User updated successfully');

      // Verificar se os dados foram realmente atualizados
      const getRes = await request(app.getHttpServer())
        .get(`/api/users/${createdUser.id}`)
        .expect(200);

      expect(getRes.body.user._firstName).toBe('Bruce');
      expect(getRes.body.user._lastName).toBe('Banner');
      expect(getRes.body.user._email).toBe('bruce.banner@example.com');
      expect(getRes.body.user._login).toBe('hulk');
    });
  });
});
