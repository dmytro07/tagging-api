import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { ORDERS_REPOSITORY_TOKEN } from './consts/order.consts';
import { OrdersRepositoryService } from './repositories/orders-repository.service';
import { OrdersController } from './controllers/orders/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/orders.entity';

@Module({
  providers: [
    OrdersService,
    { provide: ORDERS_REPOSITORY_TOKEN, useClass: OrdersRepositoryService },
  ],
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([OrdersEntity])],
})
export class OrdersModule {}
