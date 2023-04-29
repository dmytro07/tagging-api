import { Inject, Injectable } from '@nestjs/common';
import { OrdersEntity } from '../entities/orders.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { ORDERS_REPOSITORY_TOKEN } from '../consts/order.consts';
import { OrdersRepository } from '../interfaces/orders-repository.interface';
import { BaseService } from 'src/modules/shared/services/base.service';
import { TagsService } from 'src/modules/tags/services/tags.service';

@Injectable()
export class OrdersService extends BaseService<
  OrdersEntity,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(
    @Inject(ORDERS_REPOSITORY_TOKEN)
    private readonly ordersRepository: OrdersRepository,
    private readonly tagsService: TagsService,
  ) {
    super(ordersRepository);
  }

  async assignTag(orderId: string, tagId: string) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['tags'],
    });
    const tag = await this.tagsService.get(tagId);
    order.tags.push(tag);
    await this.ordersRepository.save(order);
  }
}
