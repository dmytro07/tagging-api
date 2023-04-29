import { Module } from '@nestjs/common';
import { UsersRepositoryService } from './repositories/users-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { USERS_REPOSITORY_TOKEN } from './consts/user.consts';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users/users.controller';
import { UserExistsConstraintService } from './validators/user-exists.validator';

@Module({
  providers: [
    { provide: USERS_REPOSITORY_TOKEN, useClass: UsersRepositoryService },
    UsersService,
    UserExistsConstraintService,
  ],
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
