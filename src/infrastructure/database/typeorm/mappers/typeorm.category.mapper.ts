import { CategoryEntity } from '../entities/category.entity';
import { Category } from '../../../../domain/enterprise/entities/category';

export class TypeORMCategoryMapper {
  static toDomain(raw: CategoryEntity): Category {
    return new Category(raw.id, raw.description);
  }

  static toTypeORM(category: Category): CategoryEntity {
    const categoryEntity = new CategoryEntity();
    categoryEntity.id = category.getId();
    categoryEntity.description = category.getDescription();
    return categoryEntity;
  }
}

