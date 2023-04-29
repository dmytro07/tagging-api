import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsEntity } from './entities/tags.entity';
import { TagsService } from './services/tags.service';
import { TAGS_REPOSITORY_TOKEN } from './consts/tags.consts';
import { TagsRepositoryService } from './repository/tags-repository.service';
import { TagsController } from './controllers/tags/tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TagsEntity])],
  providers: [
    TagsService,
    { provide: TAGS_REPOSITORY_TOKEN, useClass: TagsRepositoryService },
  ],
  controllers: [TagsController],
})
export class TagsModule {}
