import { Injectable } from '@nestjs/common';
import { Category } from '../../../enterprise/entities/category';
import { CategoryRepository } from '../../repositories/category-repository';

@Injectable()
export class CreateCategoryUseCase {
  constructor(readonly repository: CategoryRepository) {}

  async execute(description: string): Promise<Category> {
    return await this.repository.create(description);
  }
}
