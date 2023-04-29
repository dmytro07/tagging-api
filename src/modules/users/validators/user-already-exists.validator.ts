import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { USERS_REPOSITORY_TOKEN } from '../consts/user.consts';
import { UsersRepository } from '../interfaces/users-repository.interface';

@ValidatorConstraint({ async: true })
@Injectable()
export class UserAlreadyExistsConstraintService
  implements ValidatorConstraintInterface
{
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: UsersRepository,
  ) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { email: value },
    });

    return !!!user;
  }
}

export function UserAlreadyExists() {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `User already exists`,
      },
      constraints: [],
      validator: UserAlreadyExistsConstraintService,
    });
  };
}
