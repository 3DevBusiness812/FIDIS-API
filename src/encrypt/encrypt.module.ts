import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { EncryptService } from './encrypt.service';
import { EncryptController } from './encrypt.controller';

@Module({
  imports: [ConfigModule],
  providers: [EncryptService],
  controllers: [EncryptController],
})
export class EncryptModule {}
