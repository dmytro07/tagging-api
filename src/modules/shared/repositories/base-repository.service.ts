import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { BaseRepository } from './base-repository.interface';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepositoryService<T extends BaseEntity>
  implements BaseRepository<T>
{
  constructor(private readonly entity: Repository<T>) {}

  async save(data: DeepPartial<T>): Promise<T> {
    return this.entity.save(data);
  }

  async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.entity.save(data);
  }

  async findById(id: string): Promise<T> {
    return this.entity.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    return this.entity.findOne(options);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.entity.find(options);
  }

  async update(id: string, data: QueryDeepPartialEntity<T>): Promise<T> {
    const result = await this.entity.update(id, data);
    return result.generatedMaps[0] as T;
  }

  async delete(id: string): Promise<number> {
    return (await this.entity.delete(id)).affected;
  }

  async softDelete(id: string): Promise<number> {
    return (await this.entity.softDelete(id)).affected;
  }
}
