import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { CustomersService } from '../../../services/customers.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/currentUser';

import { Customer } from '../models/customer';

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
}
