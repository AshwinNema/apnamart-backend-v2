import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger('Logger');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        const [request, response] = context.getArgs();
        const { statusCode } = response;
        this.logger.log(
          `${request.method} ${request.url} ${statusCode} ${duration} ms`,
        );
      }),
      catchError((err) => {
        const duration = Date.now() - startTime;
        const [request, response] = context.getArgs();
        const { statusCode } = response;
        const responseMsg = err?.response?.message;
        let errorMessage = err.message;
        if (responseMsg) {
          errorMessage += ' ';
          if (Array.isArray(responseMsg)) {
            errorMessage += responseMsg.join(', ');
          } else if (typeof responseMsg === 'object') {
            errorMessage += JSON.stringify(responseMsg);
          } else {
            errorMessage += `${responseMsg}`;
          }
        }

        this.logger.error(
          `${request.method} ${request.url} ${statusCode} ${duration} ms ${errorMessage}`,
        );
        return next.handle();
      }),
    );
  }
}
