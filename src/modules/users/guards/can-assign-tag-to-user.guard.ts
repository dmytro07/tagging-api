import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TagsGuardService } from 'src/modules/tags/services/tags-guard.service';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class CanAssignTagToUserGuard implements CanActivate {
  constructor(private readonly tagsGuardService: TagsGuardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params: { tagId: string };
      user: UsersEntity;
    }>();

    return this.tagsGuardService.canManage(req.params.tagId, req.user.id);
  }
}
