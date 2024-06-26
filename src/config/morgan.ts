import * as morgan from 'morgan';
import logger from './logger';
import { Request, Response } from 'express';
import { environments } from './config';
import { ConfigService } from '@nestjs/config';
const env = new ConfigService().get('env');

morgan.token(
  'message',
  (req: Request, res: Response) => res.locals.errorMessage || '',
);

const getIpFormat = (): string =>
  env === environments.production ? ':remote-addr - ' : '';
const successResponseFormat: string = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat: string = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: {
    write: (message: string) => logger.error(message.trim()),
  },
});

export default { successHandler, errorHandler };
