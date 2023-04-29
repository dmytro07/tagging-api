import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsEntity } from './entities/tags.entity';
import { TagsService } from './services/tags.service';
import { TAGS_REPOSITORY_TOKEN } from './consts/tags.consts';
import { TagsRepositoryService } from './repository/tags-repository.service';
import { TagsController } from './controllers/tags/tags.controller';
import { TagsGuardService } from './services/tags-guard.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagsEntity])],
  providers: [
    TagsService,
    { provide: TAGS_REPOSITORY_TOKEN, useClass: TagsRepositoryService },
    TagsGuardService,
  ],
  controllers: [TagsController],
  exports: [TagsService, TagsGuardService],
})
export class TagsModule {}
