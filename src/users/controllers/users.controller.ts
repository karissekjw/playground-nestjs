import { CreateUserSchema } from '../schemas/users.schema';
import { Controller, Get, Post, Body, Param, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserEntity } from '../entities/user.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { DuplicateRecordError } from '../../shared/errors';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUser: CreateUserSchema) {
    try {
      const user = await this.usersService.create(createUser);

      return new UserEntity(user);
    } catch(error) {
      if (error instanceof DuplicateRecordError) {
        throw new ConflictException(error.message);
      }
    }

  }

  @Get(':id')
  @ApiCreatedResponse({ type: UserEntity })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (user) {
      // this will exclude `password` from the response as defined in UserEntity
      return new UserEntity(user);
    } else {
      throw new NotFoundException(`User <${id}> not found`)
    }
  }
}
