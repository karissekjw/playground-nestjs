import { UserEntity } from './../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(params: { data: Prisma.UserCreateInput }): Promise<UserEntity> {
    const { data } = params;

    return this.prisma.user.create({ data });
  }

  async getById(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: { id } })
  }
}

