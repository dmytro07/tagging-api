import { IsString, Matches, MaxLength } from 'class-validator';
import { COLOR_LENGTH, TAG_NAME_LENGTH } from '../consts/tags.consts';
import { IS_RGB_COLOR } from 'src/modules/shared/consts/regex.consts';
import { Trim } from 'src/modules/shared/decorators/trim.decorator';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @Trim()
  @IsString()
  @MaxLength(TAG_NAME_LENGTH)
  name: string;

  @Trim()
  @IsString()
  @Matches(IS_RGB_COLOR)
  @MaxLength(COLOR_LENGTH)
  color: string;

  @ApiHideProperty()
  authorId: string;
}
