import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/modules/orders/dtos/create-order.dto';
import { OrdersEntity } from 'src/modules/orders/entities/orders.entity';
import { OrdersService } from 'src/modules/orders/services/orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getAll(): Promise<OrdersEntity[]> {
    return this.ordersService.getAll();
  }

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string): Promise<OrdersEntity> {
    return this.ordersService.get(id);
  }

  @Post()
  create(@Body() body: CreateOrderDto): Promise<OrdersEntity> {
    return this.ordersService.create(body);
  }
}
