import { getManager } from 'typeorm';
import { UserEntity } from '../../../modules/database/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorType } from '../../../core/enums';
import { Validator } from '../../../core/utils/validator';
import { KeyGenerator } from '../../../core/utils/generators';
import { EmailService } from '../../../modules/email';
import { AuthActivateDto } from '../../../core/dto/auth';
import { AppEmail } from '../../../core/constants';

@Injectable()
export class ActivationService {
  constructor(private readonly _email: EmailService) {}

  public async Send(id: number): Promise<void> {
    return getManager().transaction(async entityManager => {
      const user = await entityManager
        .createQueryBuilder(UserEntity, 'user')
        .andWhere('user.id = :id', { id })
        .addSelect('user.activationResetDate')
        .getOne();
      if (Validator.DateLessThanMinutes(user.activationResetDate, 1))
        throw new BadRequestException(ErrorType.AuthActivationTime);

      user.activationKey = KeyGenerator.GenerateKey(4);
      await this._email.Send({
        to: user.email,
        from: AppEmail,
        subject: 'iPit: Activation Code',
        html: `Your activation Code: ${user.activationKey}`,
      });
      user.activationResetDate = new Date();

      await entityManager.save(user);
    });
  }

  public async Confirm(data: AuthActivateDto, id: number): Promise<void> {
    return getManager().transaction(async entityManager => {
      const user = await entityManager
        .createQueryBuilder(UserEntity, 'user')
        .andWhere('user.id = :id', { id })
        .addSelect('user.activationKey')
        .getOne();
      if (Number(user.activationKey) !== Number(data.code))
        throw new BadRequestException(ErrorType.AuthWrongActivationKey);

      user.activated = true;

      await entityManager.save(user);
    });
  }
}
