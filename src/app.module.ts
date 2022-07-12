import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonaModule } from './persona/persona.module';
import { MoralisModule } from './moralis/moralis.module';
import { configValidationSchema } from './config.schema';
import { ConfigModule } from '@nestjs/config';
import { EncryptModule } from './encrypt/encrypt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    PersonaModule,
    MoralisModule,
    EncryptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
