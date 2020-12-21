import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { getManager } from 'typeorm';
import { EmailService, RoleEntity, UserEntity } from '../../../modules';
import {
  AuthLoginDto,
  AuthRegisterDto,
  ErrorType,
  IUserJwt,
  JwtTransformer,
  RoleType,
} from '../../../core';
import { TwoFaService } from './two-fa.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwt: JwtService,
    private readonly _email: EmailService,
    private readonly _twoFaService: TwoFaService,
  ) {}

  public CreateToken(user: UserEntity): string {
    return this._jwt.sign(JwtTransformer.Format(user));
  }

  public async GetMe(id: number): Promise<UserEntity> {
    return getManager().transaction(async entityManager => {
      return await entityManager.findOne(UserEntity, {
        where: { id },
        relations: ['roles'],
      });
    });
  }

  public async Login({
    email,
    password,
    key,
  }: AuthLoginDto): Promise<UserEntity> {
    return getManager().transaction(async entityManager => {
      const user = await entityManager
        .createQueryBuilder(UserEntity, 'user')
        .addSelect([
          'user.password',
          'user.twoFactorAuth',
          'user.twoFactorKey',
          'user.twoFactorResetDate',
        ])
        .where('user.email = :email', { email })
        .leftJoinAndSelect('user.roles', 'roles')
        .getOne();
      if (!user) throw new BadRequestException(ErrorType.AuthInvalidData);

      if (!bcrypt.compareSync(password, user.password))
        throw new BadRequestException(ErrorType.AuthInvalidData);

      if (user.roles.map(value => value.name).includes(RoleType.BLOCKED))
        throw new ForbiddenException(ErrorType.AuthBlocked);

      if (user.twoFactorAuth) {
        if (user.twoFactorKey)
          await this._twoFaService.ConfirmTwoFA(user, entityManager, key);
        else await this._twoFaService.SendTwoFA(user);
      }
      return user;
    });
  }

  public async Register(data: AuthRegisterDto): Promise<UserEntity> {
    return getManager().transaction(async entityManager => {
      const user = new UserEntity();
      if (data.password !== data.repeatPassword)
        throw new BadRequestException(ErrorType.PasswordNotMatch);

      user.email = data.email;
      user.password = data.password;
      user.activated = false;
      user.twoFactorAuth = false;
      const userRole = await entityManager.findOne(RoleEntity, {
        where: { name: RoleType.USER },
      });
      if (!userRole) throw new NotFoundException(ErrorType.UserRoleNotFound);
      user.roles = [userRole];

      return await entityManager.save(UserEntity, user);
    });
  }

  public async ValidateJwtLogin(payload: IUserJwt): Promise<IUserJwt> {
    return payload;
  }
}
