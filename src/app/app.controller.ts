import { Controller, Get } from '@nestjs/common';
import { SkipAccessAuth } from 'src/auth/jwt/access.jwt';

@Controller()
export class AppController {
  constructor() {}

  @SkipAccessAuth()
  @Get('health')
  health() {
    return { status: 'Health' };
  }
}
