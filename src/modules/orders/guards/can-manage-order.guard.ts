import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { OrdersGuardService } from '../services/orders-guard.service';

@Injectable()
export class CanManageOrderGuard implements CanActivate {
  constructor(private readonly ordersGuardService: OrdersGuardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params: { tagId: string; orderId: string };
      user: UsersEntity;
    }>();

    return this.ordersGuardService.canManage(req.params.orderId, req.user.id);
  }
}
