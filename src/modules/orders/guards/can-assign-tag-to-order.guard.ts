import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TagsGuardService } from 'src/modules/tags/services/tags-guard.service';
import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { OrdersGuardService } from '../services/orders-guard.service';

@Injectable()
export class CanAssignTagToOrderGuard implements CanActivate {
  constructor(
    private readonly tagsGuardService: TagsGuardService,
    private readonly ordersGuardService: OrdersGuardService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params: { tagId: string; orderId: string };
      user: UsersEntity;
    }>();

    const canManageTag = await this.tagsGuardService.canManage(
      req.params.tagId,
      req.user.id,
    );

    return canManageTag
      ? this.ordersGuardService.canManage(req.params.orderId, req.user.id)
      : false;
  }
}
