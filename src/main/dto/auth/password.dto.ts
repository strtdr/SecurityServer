import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly repeatNewPassword: string;
}
