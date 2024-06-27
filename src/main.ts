import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';

import { AllExceptionsFilter } from './middlewares/all-exception.filter';
import { LoggingInterceptor } from './logger/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    rawBody: true,
  });
  const adapterHost = app.get(HttpAdapterHost);
  const port = new ConfigService().get('port');

  app.setGlobalPrefix('v2', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
  await app.listen(port);
}

bootstrap();
