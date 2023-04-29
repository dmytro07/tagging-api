import { Injectable } from '@nestjs/common';
import { BaseRepositoryService } from 'src/modules/shared/repositories/base-repository.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagsEntity } from '../entities/tags.entity';
import { TagsRepository } from '../interfaces/tags-repository.interface';

@Injectable()
export class TagsRepositoryService
  extends BaseRepositoryService<TagsEntity>
  implements TagsRepository
{
  constructor(
    @InjectRepository(TagsEntity)
    private readonly tagsEntity: Repository<TagsEntity>,
  ) {
    super(tagsEntity);
  }
}
