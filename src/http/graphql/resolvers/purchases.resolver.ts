import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';

import { PurchasesService } from '../../../services/purchases.service';
import { ProductsService } from '../../../services/products.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Purchase } from '../models/purchase';
import { Product } from '../models/product';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
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
}
