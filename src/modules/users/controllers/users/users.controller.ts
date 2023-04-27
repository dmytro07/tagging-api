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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
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

  @Post()
  create(@Body() body: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.create(body);
  }
}
