import { BaseEntity } from '../../shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { COLOR_LENGTH, TAG_NAME_LENGTH } from '../consts/tags.consts';
import { UsersEntity } from '../../users/entities/users.entity';

@Entity({ name: 'Tags' })
export class TagsEntity extends BaseEntity {
  @Column({ length: TAG_NAME_LENGTH })
  name: string;

  @Column({ length: COLOR_LENGTH })
  color: string;

  @Column({ type: 'uuid', nullable: true })
  authorId: string;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'authorId' })
  author: UsersEntity;
}
