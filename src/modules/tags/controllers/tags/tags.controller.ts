import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from '../../services/tags.service';
import { TagsEntity } from '../../entities/tags.entity';
import { CreateTagDto } from '../../dtos/create-tag.dto';
import { User } from 'src/modules/shared/decorators/user.decorator';
import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { UpdateTagDto } from '../../dtos/update-tag.dto';
import { CanUpdateTagGuard } from '../../guards/can-update-tag.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Tags')
@ApiBearerAuth()
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getAll(): Promise<TagsEntity[]> {
    return this.tagsService.getAll();
  }

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string): Promise<TagsEntity> {
    return this.tagsService.get(id);
  }

  @Post()
  create(
    @Body() body: CreateTagDto,
    @User() user: UsersEntity,
  ): Promise<TagsEntity> {
    return this.tagsService.create({ ...body, authorId: user.id });
  }

  @Put(':id')
  @UseGuards(CanUpdateTagGuard)
  update(
    @Body() body: UpdateTagDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TagsEntity> {
    return this.tagsService.update(body, id);
  }
}
