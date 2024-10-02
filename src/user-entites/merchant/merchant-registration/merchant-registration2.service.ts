import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import prisma from 'src/prisma/client';

@Injectable()
export class MerchantRegistration2Service {
  async getOneMerchantRegistration(args: Prisma.MerchantDetailsFindFirstArgs) {
    return prisma.merchantDetails.findFirst(args);
  }
}
