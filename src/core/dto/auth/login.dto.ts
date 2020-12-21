import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly password: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly key: string;
}
