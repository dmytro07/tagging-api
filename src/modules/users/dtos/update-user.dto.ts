import { IsString, MaxLength } from 'class-validator';
import { FIRST_NAME_LENGTH, LAST_NAME_LENGTH } from '../consts/user.consts';
import { Trim } from 'src/modules/shared/decorators/trim.decorator';

export class UpdateUserDto {
  @Trim()
  @IsString()
  @MaxLength(FIRST_NAME_LENGTH)
  firstName: string;

  @Trim()
  @IsString()
  @MaxLength(LAST_NAME_LENGTH)
  lastName: string;
}
