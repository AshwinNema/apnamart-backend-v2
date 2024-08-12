import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface ExtendedRequest extends Request {
  startTime?: number;
}

@Injectable()
export class RequestStartTimeTracker implements NestMiddleware {
  use(req: ExtendedRequest, res: Response, next: NextFunction) {
    req.startTime = Date.now();
    next();
  }
}
