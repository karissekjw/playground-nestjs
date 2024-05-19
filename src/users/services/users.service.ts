import { CreateUserSchema } from '../schemas/users.schema';
import { UsersRepository } from '../repository/users.repository';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  create(params: CreateUserSchema): Promise<UserEntity> {
    const user = this.repository.create(params);

    return user;
  }

  findOne(id: string): Promise<UserEntity> {
    const user = this.repository.findById(id);

    return user;
  }
}
