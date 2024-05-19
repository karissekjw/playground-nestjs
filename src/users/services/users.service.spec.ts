import { CreateUserSchema } from './../schemas/users.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from './users.service';
import { UsersRepository } from '../repository/users.repository';
import { createMock } from '@golevelup/ts-jest';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: createMock<UsersRepository>()
        },
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should create new user', async () => {
      const result: UserEntity = {
        id: '1',
        name: 'John Doe',
        username: 'johndoe',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const params: CreateUserSchema = {
        name: 'John Doe',
        username: 'username',
        password: 'password',
      };

      jest.spyOn(repository, 'create').mockImplementation(() => Promise.resolve(result));

      expect(service.create(params)).resolves.toBe(result);
      expect(repository.create).toHaveBeenCalledWith(params);
    })
  });
});
