import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../../api/auth/services/auth.service';
import { ConfigService } from '../../../modules';
import { IUserJwt } from '../../models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  public validate(payload: IUserJwt, done: any): void {
    this.authService
      .ValidateJwtLogin(payload)
      .then(user => done(null, user))
      .catch(err => done(err, false));
  }
}
