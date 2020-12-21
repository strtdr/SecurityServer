import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthActivateDto {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  public readonly code: string;
}
