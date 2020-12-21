import { ConfigModule, ConfigService, EmailModule } from '../../modules';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../../core';
import {
  ActivationService,
  AuthService,
  RestoreService,
  TwoFaService,
} from './services';
@Module({
  imports: [
    ConfigModule,
    EmailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRE'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RestoreService,
    ActivationService,
    TwoFaService,
    JwtStrategy,
  ],
})

export class AuthModule {}
