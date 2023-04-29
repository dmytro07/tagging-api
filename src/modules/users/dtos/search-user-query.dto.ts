import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class SearchUserQueryDto {
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  tagIds?: string[];
}
