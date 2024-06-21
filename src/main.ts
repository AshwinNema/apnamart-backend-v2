import { NestFactory } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { httpExceptionFilter } from './middlewares/http-exception.filter';
import morgan from './config/morgan';
import { ConfigService } from '@nestjs/config';
import { environments } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
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
  app.useGlobalFilters(new httpExceptionFilter());

  await app.listen(port);
}
bootstrap();
