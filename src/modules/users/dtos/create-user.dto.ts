import { IsString, MaxLength, IsEmail } from 'class-validator';
import {
  EMAIL_LENGTH,
  FIRST_NAME_LENGTH,
  LAST_NAME_LENGTH,
} from '../consts/user.consts';
import { Trim } from 'src/modules/shared/decorators/trim.decorator';

export class CreateUserDto {
  @Trim()
  @IsString()
  @MaxLength(FIRST_NAME_LENGTH)
  firstName: string;

  @Trim()
  @IsString()
  @MaxLength(LAST_NAME_LENGTH)
  lastName: string;

  @Trim()
  @IsString()
  @MaxLength(EMAIL_LENGTH)
  @IsEmail()
  email: string;
}
