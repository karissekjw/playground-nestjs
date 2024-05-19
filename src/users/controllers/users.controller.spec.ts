import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { createMock } from '@golevelup/ts-jest';
import { UserEntity } from '../entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: createMock<UsersService>()
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#findOne', () => {
    it('should return a user if user is found', async () => {
      const result: UserEntity = {
        id: '1',
        name: 'John Doe',
        username: 'johndoe',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const expectedResult = new UserEntity(result)

      jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(result));

      expect(controller.findOne('1')).resolves.toEqual(expectedResult);
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(null));

      controller.findOne('1').catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('User <1> not found');
      });
    });
  });
});
