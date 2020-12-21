import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import {
  AuthPasswordDto,
  AuthUser,
  AuthUserGuard,
  IUserJwt,
} from '../../core/';
import { UserEntity } from '../../modules/database/entities';

@ApiTags('Profile')
@Controller('profile')
@ApiBearerAuth()
@UseGuards(AuthUserGuard)
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  public async GetMe(@AuthUser() user: IUserJwt): Promise<UserEntity> {
    return await this.service.GetMe(user.id);
  }

  @Post('password')
  public async UpdatePassword(
    @Body() body: AuthPasswordDto,
    @AuthUser() user: IUserJwt,
  ): Promise<UserEntity> {
    return await this.service.UpdatePassword(body, user.id);
  }
}
