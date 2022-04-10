import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';

import { PurchasesService } from '../../../services/purchases.service';
import { ProductsService } from '../../../services/products.service';
import { CustomersService } from '../../../services/customers.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/currentUser';
import { Purchase } from '../models/purchase';
import { Product } from '../models/product';
import { CreatePurchaseInput } from '../inputs/createPurchaseInput';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  async purchases() {
    const purchases = await this.purchasesService.listAll();

    return purchases;
  }

  @ResolveField(() => Product)
  async product(
    @Parent()
    purchase: Purchase,
  ) {
    const product = await this.productsService.findOne(purchase.productId);

    return product;
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data')
    data: CreatePurchaseInput,
    @CurrentUser()
    user: AuthUser,
  ) {
    const customer = await this.customersService.findByUserId(user.sub);
    const createdPurchase = await this.purchasesService.create({
      customerId: customer.id,
      productId: data.productId,
    });

    return createdPurchase;
  }
}
