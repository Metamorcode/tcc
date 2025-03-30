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
import { MedicineDto } from './dto/medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine-dto';

import { CreateMedicineUseCase } from '../../../domain/application/use-cases/medicine/create-medicine';
import { GetAllMedicinesUseCase } from '../../../domain/application/use-cases/medicine/get-all-medicines';
import { GetByIdMedicineUseCase } from '../../../domain/application/use-cases/medicine/get-by-id-medicine';
import { DeleteMedicineUseCase } from '../../../domain/application/use-cases/medicine/delete-medicine';
import { UpdateMedicineUseCase } from '../../../domain/application/use-cases/medicine/update-medicine';

@ApiTags('Medicines')
@Controller('api/medicines')
export class MedicineController {
  constructor(
    private readonly createMedicineUseCase: CreateMedicineUseCase,
    private readonly updateMedicineUseCase: UpdateMedicineUseCase,
    private readonly getAllMedicinesUseCase: GetAllMedicinesUseCase,
    private readonly getMedicineByIdUseCase: GetByIdMedicineUseCase,
    private readonly deleteMedicineUseCase: DeleteMedicineUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new medicine' })
  @ApiBody({ description: 'Payload to create a new medicine', type: MedicineDto })
  @ApiResponse({
    status: 201,
    description: 'Medicine created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() medicineDto: MedicineDto) {
    try {
      const medicine = await this.createMedicineUseCase.execute(
        medicineDto.name,
        medicineDto.quantity,
        medicineDto.unit,
        medicineDto.description,
        medicineDto.eventTime,
        medicineDto.category,
        medicineDto.repeatFor,
        medicineDto.completed,
        medicineDto.elderlyId,
        medicineDto.userId,
      );

      return {
        message: 'Medicine created successfully',
        medicine: { id: medicine.getId(), ...medicine },
      };
    } catch (error) {
      throw new BadRequestException('Medicine could not be created');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing medicine' })
  @ApiParam({ name: 'id', description: 'Medicine ID to be updated' })
  @ApiBody({ description: 'Payload to update an existing medicine', type: UpdateMedicineDto })
  @ApiResponse({
    status: 200,
    description: 'Medicine updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Medicine not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async update(@Param('id') id: string, @Body() updateMedicineDto: UpdateMedicineDto) {
    try {
      const updatedMedicine = await this.updateMedicineUseCase.execute(id, updateMedicineDto);

      return {
        message: 'Medicine updated successfully',
        medicine: updatedMedicine,
      };
    } catch (error) {
      throw new NotFoundException('Medicine not found');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a medicine by ID' })
  @ApiParam({ name: 'id', description: 'Medicine ID to be retrieved' })
  @ApiResponse({
    status: 200,
    description: 'Medicine retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Medicine not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getById(@Param('id') id: string) {
    try {
      const medicine = await this.getMedicineByIdUseCase.execute(id);

      if (!medicine) {
        throw new NotFoundException('Medicine not found');
      }

      return {
        message: 'Medicine retrieved successfully',
        medicine: medicine,
      };
    } catch (error) {
      throw new NotFoundException('Medicine not found');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all medicines' })
  @ApiResponse({
    status: 200,
    description: 'List of medicines retrieved successfully.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getAllMedicines() {
    try {
      return await this.getAllMedicinesUseCase.execute();
    } catch (error) {
      throw new BadRequestException('Could not retrieve medicines');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a medicine by ID' })
  @ApiParam({ name: 'id', description: 'Medicine ID to be deleted' })
  @ApiResponse({
    status: 200,
    description: 'Medicine deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Medicine not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async delete(@Param('id') id: string) {
    try {
      await this.deleteMedicineUseCase.execute(id);
      return {
        message: 'Medicine deleted successfully',
      };
    } catch (error) {
      throw new NotFoundException('Medicine not found');
    }
  }
}
