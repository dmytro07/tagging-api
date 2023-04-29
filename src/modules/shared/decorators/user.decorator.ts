import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersEntity } from 'src/modules/users/entities/users.entity';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UsersEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request[USER_KEY];
  },
);

export const USER_KEY = 'user';
