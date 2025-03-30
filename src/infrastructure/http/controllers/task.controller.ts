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
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task-dto';

import { CreateTaskUseCase } from '../../../domain/application/use-cases/task/create-task';
import { GetAllTasksUseCase } from '../../../domain/application/use-cases/task/get-all-tasks';
import { GetByIdTaskUseCase } from '../../../domain/application/use-cases/task/get-by-id-task';
import { DeleteTaskUseCase } from '../../../domain/application/use-cases/task/delete-task';
import { UpdateTaskUseCase } from '../../../domain/application/use-cases/task/update-task';

@ApiTags('Tasks')
@Controller('api/tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly getAllTasksUseCase: GetAllTasksUseCase,
    private readonly getTaskByIdUseCase: GetByIdTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiBody({ description: 'Payload to create a new task', type: TaskDto })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() createTaskDto: TaskDto) {
    try {
      const task = await this.createTaskUseCase.execute(
        createTaskDto.description,
        createTaskDto.eventTime,
        createTaskDto.category,
        createTaskDto.repeatFor,
        createTaskDto.completed,
        createTaskDto.elderlyId,
        createTaskDto.userId
      );

      return {
        message: 'Task created successfully',
        task: { id: task.getId(), ...task },
      };
    } catch (error) {
      throw new BadRequestException('Task could not be created');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing task' })
  @ApiParam({ name: 'id', description: 'Task ID to be updated' })
  @ApiBody({ description: 'Payload to update an existing task', type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const updatedTask = await this.updateTaskUseCase.execute(id, updateTaskDto);

      return {
        message: 'Task updated successfully',
        task: updatedTask,
      };
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID to be retrieved' })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getById(@Param('id') id: string) {
    try {
      const task = await this.getTaskByIdUseCase.execute(id);

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      return {
        message: 'Task retrieved successfully',
        task: task,
      };
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks retrieved successfully.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getAllTasks() {
    try {
      return await this.getAllTasksUseCase.execute();
    } catch (error) {
      throw new BadRequestException('Could not retrieve tasks');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID to be deleted' })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async delete(@Param('id') id: string) {
    try {
      await this.deleteTaskUseCase.execute(id);
      return {
        message: 'Task deleted successfully',
      };
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }
}
