import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TagsService } from '../services/tags.service';
import { UsersEntity } from 'src/modules/users/entities/users.entity';

@Injectable()
export class CanUpdateTagGuard implements CanActivate {
  constructor(private readonly tagsService: TagsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params: { id: string };
      user: UsersEntity;
    }>();

    const tag = await this.tagsService.get(req.params.id);
    return tag.authorId === req.user.id;
  }
}
