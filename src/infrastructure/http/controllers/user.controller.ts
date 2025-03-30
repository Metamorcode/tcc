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
import { UserDto } from './dto/user.dto';
import { CreateUserUseCase } from '../../../domain/application/use-cases/user/create-user';
import { GetAllUsersUseCase } from '../../../domain/application/use-cases/user/get-all-users';
import { GetByIdUserUseCase } from '../../../domain/application/use-cases/user/get-by-id-user';
import { DeleteUserUseCase } from '../../../domain/application/use-cases/user/delete-user';
import { UpdateUserUseCase } from '../../../domain/application/use-cases/user/update-user';
import { UpdateUserDto } from './dto/update-user-dto';

@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetByIdUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ description: 'Payload to create a new user', type: UserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() createUserDto: UserDto) {
    try {
      const user = await this.createUserUseCase.execute(
        createUserDto.firstName,
        createUserDto.lastName,
        createUserDto.email,
        createUserDto.login,
        createUserDto.password,
        createUserDto.role
      );

      return {
        message: 'User created successfully',
        user: { id: user.getId(), ...user },
      };
    } catch (error) {
      throw new BadRequestException('User could not be created');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiParam({ name: 'id', description: 'User ID to be updated' })
  @ApiBody({ description: 'Payload to update an existing user', type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      console.log('Console do update controller', id);
      const updatedUser = await this.updateUserUseCase.execute(id, updateUserDto);

      return {
        message: 'User updated successfully',
        user: updatedUser,
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID to be retrieved' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getById(@Param('id') id: string) {
    try {
      const user = await this.getUserByIdUseCase.execute(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        message: 'User retrieved successfully',
        user: user,
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getAllUsers() {
    try {
      return await this.getAllUsersUseCase.execute();
    } catch (error) {
      throw new BadRequestException('Could not retrieve users');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID to be deleted' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async delete(@Param('id') id: string) {
    try {
      await this.deleteUserUseCase.execute(id);
      return {
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
