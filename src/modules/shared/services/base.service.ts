import { BaseRepository } from '../repositories/base-repository.interface';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseService<
  TEntity extends BaseEntity,
  TCreate extends DeepPartial<TEntity>,
  TUpdate extends QueryDeepPartialEntity<TEntity>,
> {
  constructor(private readonly baseEntity: BaseRepository<TEntity>) {}
  async get(id: string): Promise<TEntity> {
    const data = await this.baseEntity.findById(id);

    return data;
  }

  async getAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]> {
    const data = await this.baseEntity.findAll(options);

    return data;
  }

  async create(createDto: TCreate): Promise<TEntity> {
    const data = await this.baseEntity.save(createDto);

    return data;
  }

  async update(updateDto: TUpdate, id: string): Promise<TEntity> {
    const data = await this.baseEntity.update(id, updateDto);

    return data;
  }

  async delete(id: string): Promise<number> {
    const data = await this.baseEntity.delete(id);

    return data;
  }

  async softDelete(id: string): Promise<number> {
    const data = await this.baseEntity.softDelete(id);

    return data;
  }
}
