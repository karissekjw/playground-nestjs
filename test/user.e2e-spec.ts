import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { DatabaseModule } from '../src/database/database.module';
import { Reflector } from '@nestjs/core';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService).client();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

    await app.init();
  });

  describe('GET /users/:id', () => {
    it('should return 404 when user does not exist', function (done) {
      const expectedResponseBody = {
        statusCode: 404,
        message: 'User <1> not found',
        error: 'Not Found'
      }

      request(app.getHttpServer())
        .get('/users/1')
        .expect(404, expectedResponseBody, done);
    });

    it('should return 200 when user exists', async () => {
      const user = await prisma.user.create({
        data: {
          name: 'John Doe',
          username: 'johndoe',
          password: 'password'
        }
      });

      const expectedResponseBody = {
        id: user.id,
        name: user.name,
        username: user.username,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }

      await request(app.getHttpServer())
        .get(`/users/${user.id}`)
        .expect(200, expectedResponseBody);
    });
  });
});
