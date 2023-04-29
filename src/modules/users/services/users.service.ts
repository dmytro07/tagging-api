import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/modules/shared/services/base.service';
import { UsersEntity } from '../entities/users.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { USERS_REPOSITORY_TOKEN } from '../consts/user.consts';
import { UsersRepository } from '../interfaces/users-repository.interface';
import { SearchUserQueryDto } from '../dtos/search-user-query.dto';
import { In } from 'typeorm';

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

  async search(query: SearchUserQueryDto): Promise<UsersEntity[]> {
    const data = await this.usersRepository.findAll({
      where: {
        ...(query.tagIds?.length >= 1 && { tags: { id: In(query.tagIds) } }),
      },
    });

    return data;
  }
}
