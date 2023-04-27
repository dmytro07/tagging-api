import { BaseEntity } from '../../shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ORDER_NAME_LENGTH } from '../consts/order.consts';
import { UsersEntity } from 'src/modules/users/entities/users.entity';

@Entity({ name: 'Orders' })
export class OrdersEntity extends BaseEntity {
  @Column({ length: ORDER_NAME_LENGTH })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'userId' })
  user: UsersEntity;
}
