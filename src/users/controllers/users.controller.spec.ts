import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { createMock } from '@golevelup/ts-jest';
import { UserEntity } from '../entities/user.entity';
import { DuplicateRecordError } from '../../shared/errors';

const mockUser: UserEntity = {
  id: '1',
  name: 'John Doe',
  username: 'johndoe',
  password: 'password',
  createdAt: new Date(),
  updatedAt: new Date(),
};

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
      const expectedResult = new UserEntity(mockUser)

      jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(mockUser));

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

  describe('#create', () => {
    const params = {
      name: 'John Doe',
      username: 'johndoe',
      password: 'password',
    };

    it('should create a user', async () => {
      const expectedResult = new UserEntity(mockUser)

      jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(mockUser));

      expect(controller.create(params)).resolves.toEqual(expectedResult);
    });
    
    it('should throw an error if user already exists', async () => {
      jest.spyOn(service, 'create').mockImplementation(() => {
        throw new DuplicateRecordError('User already exists');
      });

      controller.create(params).catch((e) => {
        expect(e).toBeInstanceOf(ConflictException);
        expect(e.message).toBe('User already exists');
      });
    });
  });
});
