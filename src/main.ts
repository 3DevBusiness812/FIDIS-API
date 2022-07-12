import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * logger setup
   */
  const logger = new Logger();

  /**
   * cors
   */
  app.enableCors();

  /**
   * Importing config module (.env and other settings)
   */
  const config: ConfigService = app.get(ConfigService);

  /**
   * global validation pipes setup
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * swagger setup for documentation
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('FIDIS API')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'FIDIS API',
  });

  await app.listen(config.get('PORT'), () =>
    logger.log(`Server started on port: ${config.get('PORT')}`, 'main.ts'),
  );
}
bootstrap();
