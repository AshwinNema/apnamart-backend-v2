import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { TokenService2 } from 'src/auth/token/token2.service';

@Module({
  providers: [CronService, TokenService2],
})
export class CronModule {}
