import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CustomersService } from '../../../services/customers.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/currentUser';

import { Customer } from '../models/customer';
import { Purchase } from '../models/purchase';
import { CreateCustomerInput } from '../inputs/createCustomerInput';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  async customer(
    @CurrentUser()
    user: AuthUser,
  ) {
    const customer = await this.customersService.findByUserId(user.sub);

    return customer;
  }

  @ResolveField(() => [Purchase])
  async purchases(
    @Parent()
    customer: Customer,
  ) {
    const product = await this.purchasesService.findByCustomerId(customer.id);

    return product;
  }

  // TODO: verify if authenticated user has admin role (only admin can create customer)
  @Mutation(() => Customer)
  @UseGuards(AuthorizationGuard)
  async createCustomer(
    @Args('data')
    data: CreateCustomerInput,
  ) {
    const customer = await this.customersService.create(data);

    return customer;
  }
}
