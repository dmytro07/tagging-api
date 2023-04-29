import { BaseEntity } from '../../shared/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import {
  EMAIL_LENGTH,
  FIRST_NAME_LENGTH,
  LAST_NAME_LENGTH,
} from '../consts/user.consts';
import { TagsEntity } from 'src/modules/tags/entities/tags.entity';

@Entity({ name: 'Users' })
export class UsersEntity extends BaseEntity {
  @Column({ length: FIRST_NAME_LENGTH })
  firstName: string;

  @Column({ length: LAST_NAME_LENGTH })
  lastName: string;

  @Column({ unique: true, length: EMAIL_LENGTH })
  email: string;

  @ManyToMany(() => TagsEntity, { eager: true })
  @JoinTable()
  tags: TagsEntity[];
}
