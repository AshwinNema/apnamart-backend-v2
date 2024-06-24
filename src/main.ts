import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import morgan from './config/morgan';
import { ConfigService } from '@nestjs/config';
import { environments } from './config/config';
import { AllExceptionsFilter } from './middlewares/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    rawBody: true,
  });
  const adapterHost = app.get(HttpAdapterHost);
  const env = new ConfigService().get('env');
  const port = new ConfigService().get('port');

  app.setGlobalPrefix('v2', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  if (env !== environments.test) {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
  }

  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
  await app.listen(port);
}
bootstrap();
