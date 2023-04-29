import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from 'src/modules/orders/services/orders.service';
import { CreateOrderDto } from 'src/modules/orders/dtos/create-order.dto';
import { SearchOrderQueryDto } from '../../dtos/search-order-query.dto';
import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { OrdersEntity } from 'src/modules/orders/entities/orders.entity';
import { getMockedInstance } from 'src/utils/getMockedInstance';
import { TagsGuardService } from 'src/modules/tags/services/tags-guard.service';
import { OrdersGuardService } from '../../services/orders-guard.service';
import { NotFoundException } from '@nestjs/common';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;

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

  const order: OrdersEntity = {
    id: 'id',
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: new Date(),
    name: 'name',
    price: 100,
    tags: [],
    userId: 'userID',
    user,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: getMockedInstance(OrdersService),
        },
        {
          provide: TagsGuardService,
          useValue: getMockedInstance(TagsGuardService),
        },
        {
          provide: OrdersGuardService,
          useValue: getMockedInstance(OrdersGuardService),
        },
      ],
    }).compile();

    ordersController = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(ordersController).toBeDefined();
  });

  describe('getAll', () => {
    it('should call ordersService.getAll and return an array of orders', async () => {
      const orders: OrdersEntity[] = [];
      ordersService.getAll = jest.fn().mockResolvedValue(orders);

      const result = await ordersController.getAll();
      expect(ordersService.getAll).toHaveBeenCalled();
      expect(result).toBe(orders);
    });
  });

  describe('search', () => {
    it('should call ordersService.search and return an array of orders', async () => {
      const query: SearchOrderQueryDto = { tagIds: [] };

      const orders: OrdersEntity[] = [];
      ordersService.search = jest.fn().mockResolvedValue(orders);

      const result = await ordersController.search(query, user);
      expect(ordersService.search).toHaveBeenCalledWith(query, user.id);
      expect(result).toBe(orders);
    });
  });

  describe('get', () => {
    it('should call ordersService.get and return an order', async () => {
      const id = 'some-id';
      ordersService.get = jest.fn().mockResolvedValue(order);

      const result = await ordersController.get(id);
      expect(ordersService.get).toHaveBeenCalledWith(id);
      expect(result).toBe(order);
    });

    it('should call ordersService.get and throw NotFoundException', async () => {
      const id = 'some-id';
      ordersService.get = jest.fn().mockResolvedValue(null);
      try {
        await ordersController.get(id);
        expect(ordersService.get).toHaveBeenCalledWith(id);
        expect(false).toBeTruthy();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should call ordersService.create and return a created order', async () => {
      const body: CreateOrderDto = {
        name: 'name',
        price: 100,
        userId: 'userID',
      };
      ordersService.create = jest.fn().mockResolvedValue(order);

      const result = await ordersController.create(body, user);
      expect(ordersService.create).toHaveBeenCalledWith({
        ...body,
        userId: user.id,
      });
      expect(result).toBe(order);
    });
  });

  describe('assignTag', () => {
    it('should call ordersService.assignTag', async () => {
      const tagId = 'some-tag-id';
      const orderId = 'some-order-id';

      await ordersController.assignTag(tagId, orderId);
      expect(ordersService.assignTag).toHaveBeenCalledWith(orderId, tagId);
    });
  });

  describe('unassignTag', () => {
    it('should call ordersService.unassignTag', async () => {
      const tagId = 'some-tag-id';
      const orderId = 'some-order-id';

      await ordersController.unassignTag(tagId, orderId);
      expect(ordersService.unassignTag).toHaveBeenCalledWith(orderId, tagId);
    });
  });
});
