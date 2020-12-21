import { EntityManager, getManager } from 'typeorm';
import { UserEntity } from '../../../modules/database/entities';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ErrorType } from '../../../main/enums';
import { Validator } from '../../../main/utils/validator';
import { KeyGenerator } from '../../../main/utils/generators';
import { EmailService } from '../../../modules/email';
import { AppEmail } from '../../../main/constants';

@Injectable()
export class TwoFaService {
  constructor(private readonly _email: EmailService) {}

  public async ConfirmTwoFA(
    user: UserEntity,
    entityManager: EntityManager,
    key: string,
  ): Promise<void> {
    if (!Validator.DateLessThanMinutes(user.twoFactorResetDate, 1)) {
      await this.SendTwoFA(user);
      throw new BadRequestException(ErrorType.AuthTwoFactorResend);
    }
    if (user.twoFactorKey !== key) {
      throw new BadRequestException(ErrorType.AuthTwoFactorCode);
    }
    delete user.password;
    user.twoFactorKey = null;
    await entityManager.save(user);
  }

  public async SendTwoFA(user: UserEntity): Promise<void> {
    if (Validator.DateLessThanMinutes(user.twoFactorResetDate, 1))
      throw new BadRequestException(ErrorType.AuthTwoFactorTime);

    user.twoFactorKey = KeyGenerator.GenerateKey(6);
    await this._email.Send({
      to: user.email,
      from: AppEmail,
      subject: 'iPit: 2FA Code',
      html: `Your Two Factor Authentication Code: ${user.twoFactorKey}. This code is valid for 1 minute`,
    });

    user.twoFactorResetDate = new Date();
    delete user.password;

    await getManager().save(user);
    throw new HttpException(
      ErrorType.TwoFactorRedirect,
      HttpStatus.TEMPORARY_REDIRECT,
    );
  }
}
