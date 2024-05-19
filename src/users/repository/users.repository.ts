import { UserEntity } from './../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import BaseRepository from 'src/shared/base-repository';

@Injectable()
export class UsersRepository extends BaseRepository<UserEntity, Prisma.UserCreateInput, any> {
  constructor() {
    super('User');
  }
}
