import { AppModule } from '../src/app.module';
import { DatabaseModule } from '../src/infrastructure/database/database.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmService } from '../src/infrastructure/database/typeorm/typeorm.service';

import { CreateCategoryUseCase } from '../src/domain/application/use-cases/category/create-category';
import { GetByCategoryDescriptionUseCase } from '../src/domain/application/use-cases/category/get-by-description-category';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;
  let typeorm: TypeOrmService;
  let createCategory: CreateCategoryUseCase;
  let getByCategoryDescription: GetByCategoryDescriptionUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        CreateCategoryUseCase,
        GetByCategoryDescriptionUseCase,
        TypeOrmService,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    typeorm = moduleRef.get(TypeOrmService);
    createCategory = moduleRef.get(CreateCategoryUseCase);
    getByCategoryDescription = moduleRef.get(GetByCategoryDescriptionUseCase);

    await app.init();
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    await app.close();
  });

  describe('/api/categories (POST)', () => {
    it('should create a new category', async () => {
      return await request(app.getHttpServer())
        .post('/api/categories')
        .send({ description: 'Weekly' })
        .expect(201)
        .expect((res) => {
          expect(res.body.message).toBe('Category created successfully');
          expect(res.body.category.description).toBe('Weekly');
        });
    });
  });

  describe('/api/categories/description/:description (GET)', () => {
    it('should retrieve a category by description', async () => {
      // Criando uma categoria primeiro
      await createCategory.execute('Monthly');

      return request(app.getHttpServer())
        .get('/api/categories/description/Monthly')
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe('Category retrieved successfully');
          expect(res.body.category.description).toBe('Monthly');
        });
    });
  });

  describe('/api/categories/description/:description (GET) - Not Found', () => {
    it('should return 404 if category is not found', async () => {
      return request(app.getHttpServer())
        .get('/api/categories/description/NonExistent')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe('Category not found');
        });
    });
  });
});
