import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRestoreCompleteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly key: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly repeatPassword: string;
}
