import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  AuthActivateDto,
  AuthLoginDto,
  AuthRegisterDto,
  AuthRestoreCompleteDto,
  AuthRestoreSendDto,
  AuthUser,
  AuthUserGuard,
  IUserJwt,
  ResponseAuthDto,
} from '../../core';
import { UserEntity } from '../../modules';
import { ActivationService, AuthService, RestoreService } from './services';
import { ActivateGuard } from '../../core/guards/auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _auth: AuthService,
    private readonly _restore: RestoreService,
    private readonly _activation: ActivationService,
  ) {}

  @Post('login')
  public async Login(@Body() data: AuthLoginDto): Promise<ResponseAuthDto> {
    const response = await this._auth.Login(data);
    return this.TokenResponse(response);
  }

  @Post('register')
  public async Reg(@Body() data: AuthRegisterDto): Promise<ResponseAuthDto> {
    const response = await this._auth.Register(data);
    return this.TokenResponse(response);
  }

  @Post('refresh')
  @UseGuards(AuthUserGuard)
  @ApiBearerAuth()
  public async Refresh(@AuthUser() user: IUserJwt): Promise<ResponseAuthDto> {
    return this.TokenResponse(await this._auth.GetMe(user.id));
  }

  @Post('restore/send')
  public async SendRestore(@Body() data: AuthRestoreSendDto): Promise<void> {
    await this._restore.Send(data.email);
  }

  @Post('restore/confirm')
  public async ConfirmRestore(
    @Body() data: AuthRestoreCompleteDto,
  ): Promise<ResponseAuthDto> {
    const response = await this._restore.Confirm(data);
    return this.TokenResponse(await this._auth.GetMe(response.id));
  }

  @Post('activate/send')
  @UseGuards(ActivateGuard)
  @ApiBearerAuth()
  public async SendActivation(@AuthUser() user: IUserJwt): Promise<void> {
    await this._activation.Send(user.id);
  }

  @Post('activate/confirm')
  @UseGuards(ActivateGuard)
  @ApiBearerAuth()
  public async ConfirmActivation(
    @Body() data: AuthActivateDto,
    @AuthUser() user: IUserJwt,
  ): Promise<ResponseAuthDto> {
    await this._activation.Confirm(data, user.id);
    return this.TokenResponse(await this._auth.GetMe(user.id));
  }

  private TokenResponse(user: UserEntity): ResponseAuthDto {
    return new ResponseAuthDto(this._auth.CreateToken(user));
  }
}
