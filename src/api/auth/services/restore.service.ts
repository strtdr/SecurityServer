import { getManager } from 'typeorm';
import { UserEntity } from '../../../modules/database/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorType } from '../../../main/enums';
import { Validator } from '../../../main/utils/validator';
import { KeyGenerator } from '../../../main/utils/generators';
import {
  AppEmail,
  ClientUrl,
  RestoreCompleteRoute,
} from '../../../main/constants';
import { EmailService } from '../../../modules/email';
import { AuthRestoreCompleteDto } from '../../../main/dto/auth';

@Injectable()
export class RestoreService {
  constructor(private readonly _email: EmailService) {}

  public async Send(email: string): Promise<void> {
    return getManager().transaction(async entityManager => {
      const user = await entityManager
        .createQueryBuilder(UserEntity, 'user')
        .andWhere('user.email = :email', { email })
        .addSelect('user.restoreResetDate')
        .getOne();
      if (!user) throw new BadRequestException(ErrorType.AuthRestoreNoEmail);
      if (Validator.DateLessThanMinutes(user.restoreResetDate, 1))
        throw new BadRequestException(ErrorType.AuthRestoreTime);

      user.restoreKey = KeyGenerator.GeneratePasswordKey();
      const url = ClientUrl + RestoreCompleteRoute + user.restoreKey;
      await this._email.Send({
        to: user.email,
        from: AppEmail,
        subject: 'iPit: Restore Password',
        html: `To Restore your password, please click: <br/> <a href="${url}">${url}</a> <br>This link is valid for 10 minutes`,
      });
      user.restoreResetDate = new Date();

      await entityManager.save(user);
    });
  }

  public async Confirm(data: AuthRestoreCompleteDto): Promise<UserEntity> {
    return getManager().transaction(async entityManager => {
      const user = await entityManager
        .createQueryBuilder(UserEntity, 'user')
        .andWhere('user.restoreKey = :key', { key: data.key })
        .addSelect('user.restoreResetDate')
        .getOne();
      if (!user) throw new BadRequestException(ErrorType.AuthRestoreExpired);
      if (!Validator.DateLessThanMinutes(user.restoreResetDate, 10))
        throw new BadRequestException(ErrorType.AuthRestoreExpired);

      if (data.password !== data.repeatPassword)
        throw new BadRequestException(ErrorType.PasswordNotMatch);

      user.password = data.password;

      return await entityManager.save(user);
    });
  }
}
