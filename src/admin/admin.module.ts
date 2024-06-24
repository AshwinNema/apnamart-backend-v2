import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService, ExtendedClient } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [AdminService, PrismaService, UserService, ExtendedClient],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
