import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/modules/shared/services/base.service';
import { UsersEntity } from '../entities/users.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { USERS_REPOSITORY_TOKEN } from '../consts/user.consts';
import { UsersRepository } from '../interfaces/users-repository.interface';
import { TagsService } from 'src/modules/tags/services/tags.service';

@Injectable()
export class UsersService extends BaseService<
  UsersEntity,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: UsersRepository,
    private readonly tagsService: TagsService,
  ) {
    super(usersRepository);
  }

  async assignTag(userId: string, tagId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['tags'],
    });
    const tag = await this.tagsService.get(tagId);
    user.tags.push(tag);
    await this.usersRepository.save(user);
  }
}
