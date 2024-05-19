import { CreateUserDto } from '../dto/users.dto';
import { UsersRepository } from '../repository/users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async create(params: CreateUserDto) {
    const user = await this.repository.create({ data: params });

    return user;
  }

  async findOne(id: string) {
    const user = await this.repository.getById(id);

    return user;
  }
}