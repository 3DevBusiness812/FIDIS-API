import { DecryptDto } from './dto/decrypt.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { EncryptService } from './encrypt.service';
import { EncryptDto } from './dto/encrypt.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('encryption')
@Controller('encryption')
export class EncryptController {
  constructor(private readonly encryptService: EncryptService) {}

  @Post('/encrypt')
  async encrypt(@Body() body: EncryptDto) {
    return await this.encryptService.encrypt(body.payload);
  }

  @Post('/decrypt')
  async decrypt(@Body() body: DecryptDto) {
    return await this.encryptService.decrypt(body);
  }
}
