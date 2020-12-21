import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '../config';
import { APP_ENTITIES } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          type: config.get('TYPEORM_CONNECTION') as any,
          host: config.get('TYPEORM_HOST'),
          port: config.get('TYPEORM_PORT'),
          username: config.get('TYPEORM_USERNAME'),
          password: config.get('TYPEORM_PASSWORD'),
          database: config.get('TYPEORM_DATABASE'),
          entities: APP_ENTITIES,
          synchronize: Boolean(config.get('TYPEORM_SYNCHRONIZE')),
          logging: config.get('TYPEORM_LOGGING') as any,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
