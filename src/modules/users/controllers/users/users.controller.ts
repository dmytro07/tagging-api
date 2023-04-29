import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { UsersEntity } from '../../entities/users.entity';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/modules/shared/decorators/is-public.decorator';
import { User } from 'src/modules/shared/decorators/user.decorator';
import { CanAssignTagToUserGuard } from '../../guards/can-assign-tag-to-user.guard';

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
  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string): Promise<UsersEntity> {
    return this.usersService.get(id);
  }

  @IsPublic()
  @Post()
  create(@Body() body: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.create(body);
  }

  @ApiBearerAuth()
  @Patch(':tagId')
  @UseGuards(CanAssignTagToUserGuard)
  assignTag(
    @Param('tagId', ParseUUIDPipe) tagId: string,
    @User() user: UsersEntity,
  ) {
    return this.usersService.assignTag(user.id, tagId);
  }
}
