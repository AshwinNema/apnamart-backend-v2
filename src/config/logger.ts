import * as winston from 'winston';
import { environments } from './config';
import { ConfigService } from '@nestjs/config';

interface ErrorInfo {
  stack?: string;
}

const env = new ConfigService().get('env');
const enumerateErrorFormat = winston.format((info: any) => {
  if (info instanceof Error) {
    const errorInfo: ErrorInfo = {};
    if (info.stack) {
      errorInfo.stack = info.stack;
    }
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: env === environments.development ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.colorize(),
    env === environments.development
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;
