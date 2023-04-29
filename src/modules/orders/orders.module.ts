import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { ORDERS_REPOSITORY_TOKEN } from './consts/order.consts';
import { OrdersRepositoryService } from './repositories/orders-repository.service';
import { OrdersController } from './controllers/orders/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/orders.entity';
import { TagsModule } from '../tags/tags.module';
import { OrdersGuardService } from './services/orders-guard/orders-guard.service';

@Module({
  providers: [
    OrdersService,
    { provide: ORDERS_REPOSITORY_TOKEN, useClass: OrdersRepositoryService },
    OrdersGuardService,
  ],
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([OrdersEntity]), TagsModule],
})
export class OrdersModule {}
