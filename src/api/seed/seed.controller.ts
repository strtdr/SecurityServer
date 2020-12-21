import { Controller, Get } from '@nestjs/common';
import { getManager } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { RoleEntity, UserEntity } from '../../modules';
import { RoleType } from '../../core';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  private ADMIN: RoleEntity;

  @Get()
  public async seed(): Promise<string> {
    if (process.env.NODE_ENV === 'development') {
      await getManager().transaction(async entityManager => {
        await entityManager.save(new RoleEntity(RoleType.USER));
        await entityManager.save(new RoleEntity(RoleType.BLOCKED));
        this.ADMIN = await entityManager.save(new RoleEntity(RoleType.ADMIN));
        await entityManager.save(this.CreateAdmin());
      });
      return 'Done';
    } else {
      return `Failed. Your current environment is: ${process.env.NODE_ENV}`;
    }
  }

  private CreateAdmin(): UserEntity {
    const user = new UserEntity();
    user.password = 'admin';
    user.firstName = 'Vasile';
    user.lastName = 'Ropot';
    user.email = 'ropotvs@gmail.com';
    user.roles = [this.ADMIN];
    user.activated = true;
    user.twoFactorAuth = true;
    return user;
  }
}
