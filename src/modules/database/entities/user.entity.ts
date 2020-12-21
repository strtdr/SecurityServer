import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';
import { PasswordTransformer } from '../../../main/utils/transformers';
import { RoleEntity } from './role.entity';


@Entity({ name: 'app_user' })
export class UserEntity extends AbstractEntity {
  @Column({ name: 'firstName', nullable: true })
  public firstName: string;

  @Column({ name: 'lastName', nullable: true })
  public lastName: string;

  @Column({ name: 'email', unique: true })
  public email: string;

  @Column({
    name: 'password',
    select: false,
    transformer: new PasswordTransformer(),
  })
  public password: string;

  @Column({ name: 'activated', default: false })
  public activated: boolean = false;

  @Column({
    name: 'activation_key',
    select: false,
    nullable: true,
  })
  public activationKey: string;

  @Column('timestamp', {
    name: 'activation_reset_date',
    select: false,
    nullable: true,
  })
  public activationResetDate: Date;

  @Column({ name: 'two_factor_auth', nullable: true })
  public twoFactorAuth: boolean;

  @Column({
    name: 'two_factor_key',
    select: false,
    nullable: true,
  })
  public twoFactorKey: string;

  @Column('timestamp', {
    name: 'two_factor_reset_date',
    select: false,
    nullable: true,
  })
  public twoFactorResetDate: Date;

  @Column({
    name: 'restore_key',
    select: false,
    nullable: true,
  })
  public restoreKey: string;

  @Column('timestamp', {
    name: 'restore_reset_date',
    select: false,
    nullable: true,
  })
  public restoreResetDate: Date;

  @ManyToMany(
    () => RoleEntity,

    role => role.users,
  )
  @JoinTable()
  public roles: RoleEntity[];
}
