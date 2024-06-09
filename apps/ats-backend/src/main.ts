/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import hpp from 'hpp';
import compression from 'compression';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  Logger.log('🚀 ~ bootstrap ~ process.env.PORT:', process.env.PORT);
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  const port = configService.get('API_PORT') || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
