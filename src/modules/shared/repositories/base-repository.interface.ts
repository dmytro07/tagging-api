import {
  DeepPartial,
  FindOneOptions,
  FindManyOptions,
  FindOptionsWhere,
} from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface BaseRepository<T extends BaseEntity> {
  save(data: DeepPartial<T>): Promise<T>;
  saveMany(data: DeepPartial<T>[]): Promise<T[]>;
  findById(id: string): Promise<T>;
  findOne(filterCondition: FindOneOptions<T>): Promise<T>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  update(id: string, data: QueryDeepPartialEntity<T>): Promise<T>;
  delete(id: string): Promise<number>;
  softDelete(id: string): Promise<number>;
}
