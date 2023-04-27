import { IsString, MaxLength } from 'class-validator';
import { FIRST_NAME_LENGTH, LAST_NAME_LENGTH } from '../consts/user.consts';

export class UpdateUserDto {
  @IsString()
  @MaxLength(FIRST_NAME_LENGTH)
  firstName: string;

  @IsString()
  @MaxLength(LAST_NAME_LENGTH)
  lastName: string;
}
