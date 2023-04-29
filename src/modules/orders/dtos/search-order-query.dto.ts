import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class SearchOrderQueryDto {
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  tagIds?: string[];
}
