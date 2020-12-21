import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRestoreSendDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;
}
