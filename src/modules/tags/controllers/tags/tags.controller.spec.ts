import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';
import { TagsService } from '../../services/tags.service';
import { TagsEntity } from '../../entities/tags.entity';
import { CreateTagDto } from '../../dtos/create-tag.dto';
import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { UpdateTagDto } from '../../dtos/update-tag.dto';
import { NotFoundException } from '@nestjs/common';
import { getMockedInstance } from 'src/utils/getMockedInstance';
import { TagsGuardService } from '../../services/tags-guard.service';

describe('TagsController', () => {
  let tagsController: TagsController;
  let tagsService: TagsService;

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

  const tag: TagsEntity = {
    id: 'tagID',
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: new Date(),
    name: 'tagName',
    authorId: 'userID',
    author: user,
    color: 'rgb(112,12,23)',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        {
          provide: TagsService,
          useValue: getMockedInstance(TagsService),
        },
        {
          provide: TagsGuardService,
          useValue: getMockedInstance(TagsGuardService),
        },
      ],
    }).compile();

    tagsController = module.get<TagsController>(TagsController);
    tagsService = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(tagsController).toBeDefined();
  });

  describe('getAll', () => {
    it('should call tagsService.getAll and return an array of tags', async () => {
      const tags: TagsEntity[] = [];
      tagsService.getAll = jest.fn().mockResolvedValue(tags);

      const result = await tagsController.getAll();
      expect(tagsService.getAll).toHaveBeenCalled();
      expect(result).toBe(tags);
    });
  });

  describe('get', () => {
    it('should call tagsService.get and return a tag', async () => {
      const id = 'some-id';
      tagsService.get = jest.fn().mockResolvedValue(tag);

      const result = await tagsController.get(id);
      expect(tagsService.get).toHaveBeenCalledWith(id);
      expect(result).toBe(tag);
    });

    it('should call tagsService.get and throw NotFoundException', async () => {
      const id = 'some-id';
      tagsService.get = jest.fn().mockResolvedValue(null);
      try {
        await tagsController.get(id);
        expect(tagsService.get).toHaveBeenCalledWith(id);
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should call tagsService.create and return a created tag', async () => {
      const body: CreateTagDto = {
        name: 'name',
        color: 'rgb(12,12,12)',
        authorId: 'authorID',
      };
      tagsService.create = jest.fn().mockResolvedValue(tag);

      const result = await tagsController.create(body, user);
      expect(tagsService.create).toHaveBeenCalledWith({
        ...body,
        authorId: user.id,
      });
      expect(result).toBe(tag);
    });
  });

  describe('update', () => {
    it('should call tagsService.update and return an updated tag', async () => {
      const body: UpdateTagDto = {
        name: 'updatedName',
        color: 'rgb(12,123,123)',
      };
      const id = 'some-id';
      tagsService.update = jest.fn().mockResolvedValue(tag);
      const result = await tagsController.update(body, id);
      expect(tagsService.update).toHaveBeenCalledWith(body, id);
      expect(result).toBe(tag);
    });

    it('should call tagsService.update and throw NotFoundException', async () => {
      const body: UpdateTagDto = {
        name: 'updatedName',
        color: 'rgb(12,12,12)',
      };
      const id = 'some-id';
      tagsService.update = jest.fn().mockResolvedValue(null);
      try {
        await tagsController.update(body, id);
        expect(tagsService.update).toHaveBeenCalledWith(body, id);
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should call tagsService.delete and return number of deleted tags', async () => {
      const id = 'some-id';
      tagsService.delete = jest.fn().mockResolvedValue(1);
      const result = await tagsController.delete(id);
      expect(tagsService.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(1);
    });
  });
});
