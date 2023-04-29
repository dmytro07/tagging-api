import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/modules/shared/services/base.service';
import { UsersEntity } from '../entities/users.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { USERS_REPOSITORY_TOKEN } from '../consts/user.consts';
import { UsersRepository } from '../interfaces/users-repository.interface';

@Injectable()
export class UsersService extends BaseService<
  UsersEntity,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: UsersRepository,
  ) {
    super(usersRepository);
  }

  async assignTag(userId: string, tagId: string) {
    await this.usersRepository.addRelation('tags', userId, tagId);
  }

  async unassignTag(userId: string, tagId: string) {
    await this.usersRepository.removeRelation('tags', userId, tagId);
  }
}
