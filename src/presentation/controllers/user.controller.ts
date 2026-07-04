import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/user/get-user.use-case';
import { ListUsersUseCase } from '../../application/use-cases/user/list-users.use-case';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserResponseDto })
  @ApiResponse({ status: 409, description: 'A user with this email already exists.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.createUserUseCase.execute({
      name: createUserDto.name,
      email: createUserDto.email,
    });
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Return the user.', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.getUserUseCase.execute(id);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'Return all users.', type: [UserResponseDto] })
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.listUsersUseCase.execute();
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }));
  }
}
