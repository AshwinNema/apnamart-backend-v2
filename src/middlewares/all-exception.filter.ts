import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
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

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
