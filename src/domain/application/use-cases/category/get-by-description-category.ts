import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../repositories/category-repository';
import { Category } from '../../../enterprise/entities/category';

@Injectable()
export class GetByCategoryDescriptionUseCase {
  constructor(readonly repository: CategoryRepository) {}

  async execute(description: string): Promise<Category | null> {
    return await this.repository.getByDescription(description);
  }
}
