import { Injectable } from '@nestjs/common';
import { BaseRepositoryService } from 'src/modules/shared/repositories/base-repository.service';
import { UsersEntity } from '../entities/users.entity';
import { UsersRepository } from '../interfaces/users-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepositoryService
  extends BaseRepositoryService<UsersEntity>
  implements UsersRepository
{
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersEntity: Repository<UsersEntity>,
  ) {
    super(usersEntity);
  }
}
