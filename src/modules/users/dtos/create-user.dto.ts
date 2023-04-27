import { IsString, MaxLength, IsEmail } from 'class-validator';
import {
  EMAIL_LENGTH,
  FIRST_NAME_LENGTH,
  LAST_NAME_LENGTH,
} from '../consts/user.consts';

export class CreateUserDto {
  @IsString()
  @MaxLength(FIRST_NAME_LENGTH)
  firstName: string;

  @IsString()
  @MaxLength(LAST_NAME_LENGTH)
  lastName: string;

  @IsString()
  @MaxLength(EMAIL_LENGTH)
  @IsEmail()
  email: string;
}
