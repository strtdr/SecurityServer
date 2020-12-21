import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ApiGuard } from '../core';
import { AuthModule } from './auth';
import { SeedModule } from './seed';
import { ProfileModule } from './profile';

@Module({
  imports: [AuthModule, SeedModule, ProfileModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiGuard,
    },
  ],
})
export class ApiModule {}
