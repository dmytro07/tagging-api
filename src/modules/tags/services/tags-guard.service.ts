import { Injectable } from '@nestjs/common';
import { TagsService } from './tags.service';

@Injectable()
export class TagsGuardService {
  constructor(private readonly tagsService: TagsService) {}

  async canManage(tagId: string, userId: string): Promise<boolean> {
    const tag = await this.tagsService.get(tagId);

    return tag.authorId === userId;
  }
}
