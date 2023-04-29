import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { UsersEntity } from '../../entities/users.entity';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/modules/shared/decorators/is-public.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<UsersEntity[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string): Promise<UsersEntity> {
    return this.usersService.get(id);
  }

  @IsPublic()
  @Post()
  create(@Body() body: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.create(body);
  }
}
