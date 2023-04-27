import { Injectable } from '@nestjs/common';
import { BaseRepositoryService } from 'src/modules/shared/repositories/base-repository.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersEntity } from '../entities/orders.entity';
import { OrdersRepository } from '../interfaces/orders-repository.interface';

@Injectable()
export class OrdersRepositoryService
  extends BaseRepositoryService<OrdersEntity>
  implements OrdersRepository
{
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly ordersEntity: Repository<OrdersEntity>,
  ) {
    super(ordersEntity);
  }
}
