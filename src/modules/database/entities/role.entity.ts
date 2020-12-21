import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleType } from '../../../main';

@Entity({ name: 'app_role' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 50, unique: true, nullable: true, enum: RoleType })
  public name: RoleType;

  @ManyToMany(
    () => UserEntity,
    user => user.roles,
  )
  public users?: UserEntity[];

  constructor(name: RoleType) {
    this.name = name;
  }
}
