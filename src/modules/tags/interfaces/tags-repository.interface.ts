import { BaseRepository } from 'src/modules/shared/repositories/base-repository.interface';
import { TagsEntity } from '../entities/tags.entity';

export interface TagsRepository extends BaseRepository<TagsEntity> {}
