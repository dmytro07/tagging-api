import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { TagsGuardService } from '../services/tags-guard.service';

@Injectable()
export class CanManageTagGuard implements CanActivate {
  constructor(private readonly tagsGuardService: TagsGuardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params: { id: string };
      user: UsersEntity;
    }>();

    return this.tagsGuardService.canManage(req.params.id, req.user.id);
  }
}
