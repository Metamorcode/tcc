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
import { ElderlyDto } from './dto/elderly.dto';
import { UpdateElderlyDto } from './dto/update-elderly-dto';

import { CreateElderlyUseCase } from '../../../domain/application/use-cases/elderly/create-elderly';
import { GetAllElderlyUseCase } from '../../../domain/application/use-cases/elderly/get-all-elderly';
import { GetByIdElderlyUseCase } from '../../../domain/application/use-cases/elderly/get-by-id-elderly';
import { DeleteElderlyUseCase } from '../../../domain/application/use-cases/elderly/delete-elderly';
import { UpdateElderlyUseCase } from '../../../domain/application/use-cases/elderly/update-elderly';

@ApiTags('Elderly')
@Controller('api/elderly')
export class ElderlyController {
  constructor(
    private readonly createElderlyUseCase: CreateElderlyUseCase,
    private readonly updateElderlyUseCase: UpdateElderlyUseCase,
    private readonly getAllElderlyUseCase: GetAllElderlyUseCase,
    private readonly getElderlyByIdUseCase: GetByIdElderlyUseCase,
    private readonly deleteElderlyUseCase: DeleteElderlyUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create an elderly person' })
  @ApiBody({ description: 'Payload to create a new elderly person', type: ElderlyDto })
  @ApiResponse({
    status: 201,
    description: 'Elderly person created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() createElderlyDto: ElderlyDto) {
    try {
      const elderly = await this.createElderlyUseCase.execute(
        createElderlyDto.firstName,
        createElderlyDto.lastName,
        createElderlyDto.birthDate,
        createElderlyDto.userFamily
      );

      return {
        message: 'Elderly person created successfully',
        elderly: {
          id: elderly.getId(),
          firstName: elderly.getFirstName(),
          lastName: elderly.getLastName(),
          birthDate: elderly.getBirthDate(),
          userFamily: elderly.getUserFamily(),
        },
      };
    } catch (error) {
      throw new BadRequestException('Elderly person could not be created');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing elderly person' })
  @ApiParam({ name: 'id', description: 'Elderly person ID to be updated' })
  @ApiBody({ description: 'Payload to update an existing elderly person', type: UpdateElderlyDto })
  @ApiResponse({
    status: 200,
    description: 'Elderly person updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Elderly person not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async update(@Param('id') id: string, @Body() updateElderlyDto: UpdateElderlyDto) {
    try {
      const updatedElderly = await this.updateElderlyUseCase.execute(id, updateElderlyDto);

      return {
        message: 'Elderly person updated successfully',
        elderly: updatedElderly,
      };
    } catch (error) {
      throw new NotFoundException('Elderly person not found');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an elderly person by ID' })
  @ApiParam({ name: 'id', description: 'Elderly person ID to be retrieved' })
  @ApiResponse({
    status: 200,
    description: 'Elderly person retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Elderly person not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getById(@Param('id') id: string) {
    try {
      const elderly = await this.getElderlyByIdUseCase.execute(id);

      if (!elderly) {
        throw new NotFoundException('Elderly person not found');
      }

      return {
        message: 'Elderly person retrieved successfully',
        elderly: elderly,
      };
    } catch (error) {
      throw new NotFoundException('Elderly person not found');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all elderly persons' })
  @ApiResponse({
    status: 200,
    description: 'List of elderly persons retrieved successfully.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getAllElderly() {
    try {
      return await this.getAllElderlyUseCase.execute();
    } catch (error) {
      throw new BadRequestException('Could not retrieve elderly persons');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an elderly person by ID' })
  @ApiParam({ name: 'id', description: 'Elderly person ID to be deleted' })
  @ApiResponse({
    status: 200,
    description: 'Elderly person deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Elderly person not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async delete(@Param('id') id: string) {
    try {
      await this.deleteElderlyUseCase.execute(id);
      return {
        message: 'Elderly person deleted successfully',
      };
    } catch (error) {
      throw new NotFoundException('Elderly person not found');
    }
  }
}
