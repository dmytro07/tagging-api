import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../../services/users.service';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UsersEntity } from '../../entities/users.entity';
import { SearchUserQueryDto } from '../../dtos/search-user-query.dto';
import { getMockedInstance } from 'src/utils/getMockedInstance';
import { NotFoundException } from '@nestjs/common';
import { TagsGuardService } from 'src/modules/tags/services/tags-guard.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const user: UsersEntity = {
    id: 'userID',
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: new Date(),
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    tags: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: getMockedInstance(UsersService),
        },
        {
          provide: TagsGuardService,
          useValue: getMockedInstance(TagsGuardService),
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('getAll', () => {
    it('should call usersService.getAll and return an array of users', async () => {
      const users: UsersEntity[] = [];
      usersService.getAll = jest.fn().mockResolvedValue(users);

      const result = await usersController.getAll();
      expect(usersService.getAll).toHaveBeenCalled();
      expect(result).toBe(users);
    });
  });

  describe('search', () => {
    it('should call usersService.search and return an array of users', async () => {
      const query: SearchUserQueryDto = { tagIds: [] };

      const users: UsersEntity[] = [];
      usersService.search = jest.fn().mockResolvedValue(users);

      const result = await usersController.search(query);
      expect(usersService.search).toHaveBeenCalledWith(query);
      expect(result).toBe(users);
    });
  });

  describe('get', () => {
    it('should call usersService.get and return a user', async () => {
      const id = 'some-id';
      usersService.get = jest.fn().mockResolvedValue(user);

      const result = await usersController.get(id);
      expect(usersService.get).toHaveBeenCalledWith(id);
      expect(result).toBe(user);
    });

    it('should call usersService.get and throw NotFoundException', async () => {
      const id = 'some-id';
      usersService.get = jest.fn().mockResolvedValue(null);
      try {
        await usersController.get(id);
        expect(usersService.get).toHaveBeenCalledWith(id);
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should call usersService.create and return a created user', async () => {
      const body: CreateUserDto = {
        email: 'email',
        firstName: 'firstName',
        lastName: 'lastName',
      };
      usersService.create = jest.fn().mockResolvedValue(user);

      const result = await usersController.create(body);
      expect(usersService.create).toHaveBeenCalledWith(body);
      expect(result).toBe(user);
    });
  });

  describe('assignTag', () => {
    it('should call usersService.assignTag', async () => {
      const tagId = 'some-tag-id';
      usersService.assignTag = jest.fn().mockResolvedValue(user);

      await usersController.assignTag(tagId, user);
      expect(usersService.assignTag).toHaveBeenCalledWith(user.id, tagId);
    });
  });

  describe('unassignTag', () => {
    it('should call usersService.unassignTag', async () => {
      const tagId = 'some-tag-id';
      usersService.unassignTag = jest.fn().mockResolvedValue(user);

      await usersController.unassignTag(tagId, user);
      expect(usersService.unassignTag).toHaveBeenCalledWith(user.id, tagId);
    });
  });
});
