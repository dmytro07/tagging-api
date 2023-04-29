import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/modules/orders/dtos/create-order.dto';
import { OrdersEntity } from 'src/modules/orders/entities/orders.entity';
import { OrdersService } from 'src/modules/orders/services/orders.service';
import { User } from 'src/modules/shared/decorators/user.decorator';
import { UsersEntity } from 'src/modules/users/entities/users.entity';

@ApiTags('Orders')
@ApiBearerAuth()
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
  create(
    @Body() body: CreateOrderDto,
    @User() user: UsersEntity,
  ): Promise<OrdersEntity> {
    return this.ordersService.create({ ...body, userId: user.id });
  }
}
