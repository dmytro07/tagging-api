import { Inject, Injectable } from '@nestjs/common';
import { OrdersEntity } from '../entities/orders.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { ORDERS_REPOSITORY_TOKEN } from '../consts/order.consts';
import { OrdersRepository } from '../interfaces/orders-repository.interface';
import { BaseService } from 'src/modules/shared/services/base.service';

@Injectable()
export class OrdersService extends BaseService<
  OrdersEntity,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(
    @Inject(ORDERS_REPOSITORY_TOKEN)
    private readonly usersRepository: OrdersRepository,
  ) {
    super(usersRepository);
  }
}
