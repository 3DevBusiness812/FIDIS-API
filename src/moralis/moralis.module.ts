import { Module } from '@nestjs/common';
import { MoralisController } from './moralis.controller';
import { MoralisService } from './moralis.service';

@Module({
  controllers: [MoralisController],
  providers: [MoralisService]
})
export class MoralisModule {}
