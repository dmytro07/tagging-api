import { Injectable } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Injectable()
export class OrdersGuardService {
  constructor(private readonly ordersService: OrdersService) {}

  async canManage(orderId: string, userId: string): Promise<boolean> {
    const order = await this.ordersService.get(orderId);

    return order?.userId === userId;
  }
}
