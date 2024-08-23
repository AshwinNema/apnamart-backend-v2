import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [CronService],
})
export class CronModule {}
