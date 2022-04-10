import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  findByUserId(userId: string) {
    return this.prisma.customer.findUnique({
      where: {
        userId,
      },
    });
  }
}
