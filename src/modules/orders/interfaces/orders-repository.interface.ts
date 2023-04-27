import { BaseRepository } from 'src/modules/shared/repositories/base-repository.interface';
import { OrdersEntity } from '../entities/orders.entity';

export interface OrdersRepository extends BaseRepository<OrdersEntity> {}
