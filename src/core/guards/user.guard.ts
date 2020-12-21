import { IUserJwt } from '../models';
import { ActivatedGuard } from './auth';

export class AuthUserGuard extends ActivatedGuard {
  public handleRequest(err: any, user: IUserJwt): any {
    super.handleRequest(err, user);
    return user;
  }
}
