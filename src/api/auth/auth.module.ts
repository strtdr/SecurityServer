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

export class AuthModule {}
