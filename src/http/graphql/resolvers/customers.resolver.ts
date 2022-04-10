import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CustomersService } from '../../../services/customers.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/currentUser';

import { Customer } from '../models/customer';
import { CreateCustomerInput } from '../inputs/createCustomerInput';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private customersService: CustomersService) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  async customer(
    @CurrentUser()
    user: AuthUser,
  ) {
    const customer = await this.customersService.findByUserId(user.sub);

    return customer;
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
