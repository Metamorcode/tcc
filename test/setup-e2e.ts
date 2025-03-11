import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvConfig } from '../src/config/env/entities/env.config';
import { UserEntity } from '../src/infrastructure/database/typeorm/entities/user.entity';
import { TaskEntity } from '../src/infrastructure/database/typeorm/entities/task.entity';
import { CategoryEntity } from '../src/infrastructure/database/typeorm/entities/category.entity';
import { ElderlyEntity } from '../src/infrastructure/database/typeorm/entities/elderly.entity';
import { MedicineEntity } from '../src/infrastructure/database/typeorm/entities/medicine.entity';

config({ path: '.env', override: true });
config({ path: '.env.test', override: true });

const env = plainToInstance(EnvConfig, process.env, {
  enableImplicitConversion: true,
});
const errors = validateSync(env);
if (errors.length > 0) {
  throw new Error(`Invalid environment variables: ${errors}`);
}

export const testDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [CategoryEntity, ElderlyEntity, UserEntity, TaskEntity, MedicineEntity],
  migrations: ['./migrations/*.ts'],
  logging: false,
  synchronize: false,
  dropSchema: true,
});

beforeAll(async () => {
  await testDataSource.initialize();
  await testDataSource.runMigrations();
});

afterAll(async () => {
  await testDataSource.dropDatabase();
  await testDataSource.destroy();
});
