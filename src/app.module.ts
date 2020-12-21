import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { DatabaseModule, EmailModule } from './modules';

@Module({
  imports: [DatabaseModule, ApiModule, EmailModule],
})
export class AppModule {
}
