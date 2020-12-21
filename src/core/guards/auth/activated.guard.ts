import { IUserJwt } from '../../models';
import {
  NotAcceptableException,
  PreconditionFailedException,
} from '@nestjs/common';
import { ErrorType } from '../../enums';
import { AntiBlock } from './blocked.guard';

export class ActivatedGuard extends AntiBlock {
  public handleRequest(err: any, user: IUserJwt): any {
    super.handleRequest(err, user);
    if (!user.activated)
      throw new PreconditionFailedException(ErrorType.AuthNoActivated);
    return user;
  }
}

export class ActivateGuard extends AntiBlock {
  public handleRequest(err: any, user: IUserJwt): any {
    super.handleRequest(err, user);
    if (user.activated)
      throw new NotAcceptableException(ErrorType.AuthActivated);
    return user;
  }
}
