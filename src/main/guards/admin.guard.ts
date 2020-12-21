import { IUserJwt } from '../models';
import { AuthUserGuard } from './user.guard';
import { ErrorType, RoleType } from '../enums';
import { ForbiddenException } from '@nestjs/common';

export class AdminGuard extends AuthUserGuard {
  public handleRequest(err: any, user: IUserJwt): any {
    super.handleRequest(err, user);
    if (!user.roles.includes(RoleType.ADMIN))
      throw new ForbiddenException(ErrorType.Forbidden);
    return user;
  }
}
