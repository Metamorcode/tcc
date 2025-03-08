import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateUserUseCase } from '../../../domain/application/use-cases/user/create-user';
import { UserDto } from './dto/user.dto';
import { GetAllUsersUseCase } from '../../../domain/application/use-cases/user/get-all-users';

@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsers: GetAllUsersUseCase
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
  async create(@Body() createUserDto: UserDto) {
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
    };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully.',
  })
  async findAll() {
    return await this.getAllUsers.execute();
  }
}
