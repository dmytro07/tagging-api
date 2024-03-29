import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { UsersEntity } from '../../entities/users.entity';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/modules/shared/decorators/is-public.decorator';
import { User } from 'src/modules/shared/decorators/user.decorator';
import { CanAssignTagToUserGuard } from '../../guards/can-assign-tag-to-user.guard';
import { ThrowNotFound } from 'src/modules/shared/decorators/throw-not-found.decorator';
import { SearchUserQueryDto } from '../../dtos/search-user-query.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  getAll(): Promise<UsersEntity[]> {
    return this.usersService.getAll();
  }

  @ApiBearerAuth()
  @Get('search')
  search(@Query() query: SearchUserQueryDto): Promise<UsersEntity[]> {
    return this.usersService.search(query);
  }

  @ApiBearerAuth()
  @Get(':id')
  @ThrowNotFound()
  get(@Param('id', ParseUUIDPipe) id: string): Promise<UsersEntity> {
    return this.usersService.get(id);
  }

  @IsPublic()
  @Post()
  create(@Body() body: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.create(body);
  }

  @ApiBearerAuth()
  @Patch(':tagId/assign')
  @UseGuards(CanAssignTagToUserGuard)
  assignTag(
    @Param('tagId', ParseUUIDPipe) tagId: string,
    @User() user: UsersEntity,
  ) {
    return this.usersService.assignTag(user.id, tagId);
  }

  @ApiBearerAuth()
  @Patch(':tagId/unassign')
  unassignTag(
    @Param('tagId', ParseUUIDPipe) tagId: string,
    @User() user: UsersEntity,
  ) {
    return this.usersService.unassignTag(user.id, tagId);
  }
}
