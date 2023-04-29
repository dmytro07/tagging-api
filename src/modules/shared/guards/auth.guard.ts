import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';
import { UsersService } from 'src/modules/users/services/users.service';
import { USER_KEY } from '../decorators/user.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly AUTH_HEADER = 'authorization';

  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers[this.AUTH_HEADER];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const userId = accessToken.replace('Bearer', '').trim();
    const user = await this.usersService.get(userId);
    if (!user) {
      return false;
    }
    request[USER_KEY] = user;

    return true;
  }
}
