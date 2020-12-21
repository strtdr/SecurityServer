import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterDto {
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
  @IsNotEmpty()
  public readonly repeatPassword: string;
}
