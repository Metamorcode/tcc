import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Delete,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';

import { CreateCategoryUseCase } from '../../../domain/application/use-cases/category/create-category';
import { GetByCategoryDescriptionUseCase } from '../../../domain/application/use-cases/category/get-by-description-category';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getByCategoryDescriptionUseCase: GetByCategoryDescriptionUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ description: 'Payload to create a new category', type: CategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() categoryDto: CategoryDto) {
    try {
      const category = await this.createCategoryUseCase.execute(categoryDto.description);

      return {
        message: 'Category created successfully',
        category: { id: category.getId(), description: category.getDescription() },
      };
    } catch (error) {
      throw new BadRequestException('Category could not be created');
    }
  }

  @Get('description/:description')
  @ApiOperation({ summary: 'Retrieve a category by description' })
  @ApiParam({ name: 'description', description: 'Category description to be retrieved' })
  @ApiResponse({
    status: 200,
    description: 'Category retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getByDescription(@Param('description') description: string) {
    try {
      const category = await this.getByCategoryDescriptionUseCase.execute(description);

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      return {
        message: 'Category retrieved successfully',
        category: { id: category.getId(), description: category.getDescription() },
      };
    } catch (error) {
      throw new NotFoundException('Category not found');
    }
  }
}
