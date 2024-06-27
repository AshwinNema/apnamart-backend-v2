import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from '../config/config';
import { AuthModule } from 'src/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from 'src/cron/cron.module';
import { ItemEntitiesModule } from 'src/item-entities/item-entities.module';
import { UserEntitesModule } from 'src/user-entites/user-entites.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateConfig }),
    ScheduleModule.forRoot(),
    AuthModule,
    CronModule,
    ItemEntitiesModule,
    UserEntitesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
