import { UserEntity } from '../../../modules';
import { IUserJwt } from '../../models';

export class JwtTransformer {
  public static Format = (user: UserEntity): IUserJwt => {
    return {
      id: user.id,
      roles: user.roles ? user.roles.map(value => value.name) : [],
      email: user.email,
      activated: user.activated,
    };
  };
}
