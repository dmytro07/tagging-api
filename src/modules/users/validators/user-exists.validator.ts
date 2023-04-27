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
export class UserExistsConstraintService
  implements ValidatorConstraintInterface
{
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: UsersRepository,
  ) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.usersRepository.findById(value);

    return !!user;
  }
}

export function UserExists() {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName} doesn't exists`,
      },
      constraints: [],
      validator: UserExistsConstraintService,
    });
  };
}
