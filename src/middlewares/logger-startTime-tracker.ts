import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

interface ExtendedRequest extends Request {
  startTime?: Number;
}

@Injectable()
export class RequestStartTimeTracker implements NestMiddleware {
  use(req: ExtendedRequest, res: Response, next: Function) {
    req.startTime = Date.now();
    next();
  }
}
