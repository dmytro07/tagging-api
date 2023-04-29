import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/modules/orders/dtos/create-order.dto';
import { OrdersEntity } from 'src/modules/orders/entities/orders.entity';
import { OrdersService } from 'src/modules/orders/services/orders.service';
import { User } from 'src/modules/shared/decorators/user.decorator';
import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { CanAssignTagToOrderGuard } from '../../guards/can-assign-tag-to-order.guard';
import { CanManageOrderGuard } from '../../guards/can-manage-order.guard';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getAll(): Promise<OrdersEntity[]> {
    return this.ordersService.getAll({ relations: ['tags'] });
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

  @Patch(':tagId/:orderId/assign')
  @UseGuards(CanAssignTagToOrderGuard)
  assignTag(
    @Param('tagId', ParseUUIDPipe) tagId: string,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    return this.ordersService.assignTag(orderId, tagId);
  }

  @Patch(':tagId/:orderId/unassign')
  @UseGuards(CanManageOrderGuard)
  unassignTag(
    @Param('tagId', ParseUUIDPipe) tagId: string,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    return this.ordersService.unassignTag(orderId, tagId);
  }
}
