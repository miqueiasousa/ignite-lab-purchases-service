import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateCustomerParams {
  userId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create({ userId }: CreateCustomerParams) {
    const customer = await this.prisma.customer.findUnique({
      where: { userId },
    });

    if (customer) {
      throw new Error('Customer already exists!');
    }

    return this.prisma.customer.create({
      data: {
        userId,
      },
    });
  }

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
