import { Inject, Injectable } from '@nestjs/common';
import { TagsEntity } from '../entities/tags.entity';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { UpdateTagDto } from '../dtos/update-tag.dto';
import { TAGS_REPOSITORY_TOKEN } from '../consts/tags.consts';
import { TagsRepositoryService } from '../repository/tags-repository.service';
import { BaseService } from 'src/modules/shared/services/base.service';

@Injectable()
export class TagsService extends BaseService<
  TagsEntity,
  CreateTagDto,
  UpdateTagDto
> {
  constructor(
    @Inject(TAGS_REPOSITORY_TOKEN)
    private readonly tagsRepository: TagsRepositoryService,
  ) {
    super(tagsRepository);
  }
}
