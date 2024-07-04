import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger;
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.logger = new Logger('Error Logger');
  }

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const requestUrl = httpAdapter.getRequestUrl(request);
    const errorResponse =
      exception instanceof HttpException ? exception.getResponse() : exception;

    let errorMsg =
      exception instanceof HttpException
        ? errorResponse?.message
        : exception?.message;

    if (Array.isArray(errorMsg)) {
      errorMsg = errorMsg.join(', ');
    } else if (typeof errorMsg === 'object') {
      errorMsg = JSON.stringify(errorMsg);
    }
    if (response?.message && response?.message != errorMsg) {
      errorMsg += ` ${response?.message}`;
    }
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: requestUrl,
      message: errorMsg,
    };

    response.on('finish', () => {
      if (request.isLogged) {
        return;
      }

      const duration = Date.now() - request.startTime;
      this.logger.error(
        `${request.method} ${request.url} ${httpStatus} ${duration} ms ${errorMsg}`,
      );
    });

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
