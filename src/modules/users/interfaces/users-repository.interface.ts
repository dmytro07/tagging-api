import { BaseRepository } from 'src/modules/shared/repositories/base-repository.interface';
import { UsersEntity } from '../entities/users.entity';

export interface UsersRepository extends BaseRepository<UsersEntity> {}
