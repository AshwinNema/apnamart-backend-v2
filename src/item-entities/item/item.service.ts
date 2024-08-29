import { Injectable } from '@nestjs/common';
import prisma from 'src/prisma/client';

@Injectable()
export class ItemService {
  async getOneItem(where, otherOptions?: object) {
    return prisma.item.findFirst({ where, ...otherOptions });
  }
}
