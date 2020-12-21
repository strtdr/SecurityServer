import { AuthGuard } from '@nestjs/passport';
import { IUserJwt } from '../../models';
import { ErrorType, RoleType } from '../../enums';
import { UnauthorizedException } from '@nestjs/common';

export class AntiBlock extends AuthGuard('jwt') {
  public handleRequest(err: any, user: IUserJwt): any {
    if (!user.roles)
      throw new UnauthorizedException(ErrorType.AuthInvalidAccount);
    if (user.roles.includes(RoleType.BLOCKED))
      throw new UnauthorizedException(ErrorType.AuthBlocked);
    return user;
  }
}
