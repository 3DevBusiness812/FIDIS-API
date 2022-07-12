import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecryptDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dataToDecrypt: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authTag: string;
}
