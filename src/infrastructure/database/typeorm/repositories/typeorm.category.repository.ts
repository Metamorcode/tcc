import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryRepository } from '../../../../domain/application/repositories/category-repository';
import { Category } from '../../../../domain/enterprise/entities/category';
import { CategoryEntity } from '../entities/category.entity';
import { TypeORMCategoryMapper } from '../mappers/typeorm.category.mapper';

@Injectable()
export class TypeORMCategoryRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>
  ) {}

  async create(description: string): Promise<Category> {
    const categoryEntity = new CategoryEntity();
    categoryEntity.description = description;
    
    const savedCategory = await this.repository.save(categoryEntity);
    return TypeORMCategoryMapper.toDomain(savedCategory);
  }

  async getByDescription(description: string): Promise<Category | null> {
    const categoryEntity = await this.repository.findOne({
      where: { description },
    });
    return categoryEntity ? TypeORMCategoryMapper.toDomain(categoryEntity) : null;
  }
}
