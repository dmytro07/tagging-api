import { Inject, Injectable } from '@nestjs/common';
import { OrdersEntity } from '../entities/orders.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { ORDERS_REPOSITORY_TOKEN } from '../consts/order.consts';
import { OrdersRepository } from '../interfaces/orders-repository.interface';
import { BaseService } from 'src/modules/shared/services/base.service';
import { In } from 'typeorm';
import { SearchOrderQueryDto } from '../dtos/search-order-query.dto';

@Injectable()
export class OrdersService extends BaseService<
  OrdersEntity,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(
    @Inject(ORDERS_REPOSITORY_TOKEN)
    private readonly ordersRepository: OrdersRepository,
  ) {
    super(ordersRepository);
  }

  async assignTag(orderId: string, tagId: string) {
    await this.ordersRepository.addRelation('tags', orderId, tagId);
  }

  async unassignTag(orderId: string, tagId: string) {
    await this.ordersRepository.removeRelation('tags', orderId, tagId);
  }

  async search(
    query: SearchOrderQueryDto,
    userId: string,
  ): Promise<OrdersEntity[]> {
    const data = await this.ordersRepository.findAll({
      where: {
        userId,
        ...(query.tagIds?.length >= 1 && { tags: { id: In(query.tagIds) } }),
      },
    });

    return data;
  }
}
