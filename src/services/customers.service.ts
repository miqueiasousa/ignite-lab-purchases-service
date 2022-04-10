import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        userId,
      },
    });

    if (!customer) {
      throw new Error('Customer not found!');
    }

    return customer;
  }
}
