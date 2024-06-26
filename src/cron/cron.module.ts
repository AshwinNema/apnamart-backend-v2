import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { TokenService2 } from 'src/token/token2.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CronService, TokenService2, PrismaService],
})
export class CronModule {}
