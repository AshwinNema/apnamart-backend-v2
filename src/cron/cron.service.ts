import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TokenService2 } from 'src/token/token2.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private tokenService: TokenService2) {}
  @Cron(CronExpression.EVERY_6_HOURS)
  async deleteExpiredTokens() {
    this.logger.log('Deleting all the expired tokens');
    const tokens = await this.tokenService.deleteMany({
      expires: {
        lte: new Date(),
      },
    });
  }
}
