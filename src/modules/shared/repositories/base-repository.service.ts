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
    await this.entity.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<number> {
    return (await this.entity.delete(id)).affected;
  }

  async softDelete(id: string): Promise<number> {
    return (await this.entity.softDelete(id)).affected;
  }

  async addRelation(
    propertyPath: Extract<keyof T, string>,
    baseEntityId: string,
    relatedEntityId: string,
  ) {
    const existingRelation = await this.entity.findOne({
      where: {
        id: baseEntityId,
        [propertyPath]: { id: relatedEntityId },
      } as FindOptionsWhere<T>,
      relations: [propertyPath],
    });
    !existingRelation &&
      (await this.entity
        .createQueryBuilder()
        .relation(propertyPath)
        .of(baseEntityId)
        .add(relatedEntityId));
  }

  async removeRelation(
    propertyPath: Extract<keyof T, string>,
    baseEntityId: string,
    relatedEntityId: string,
  ) {
    this.entity
      .createQueryBuilder()
      .relation(propertyPath)
      .of(baseEntityId)
      .remove(relatedEntityId);
  }
}
