import { BaseEntity } from '../../shared/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { ORDER_NAME_LENGTH } from '../consts/order.consts';
import { UsersEntity } from '../../users/entities/users.entity';
import { TagsEntity } from '../../tags/entities/tags.entity';

@Entity({ name: 'Orders' })
export class OrdersEntity extends BaseEntity {
  @Column({ length: ORDER_NAME_LENGTH })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'userId' })
  user: UsersEntity;

  @ManyToMany(() => TagsEntity, { eager: true })
  @JoinTable()
  tags: TagsEntity[];
}
