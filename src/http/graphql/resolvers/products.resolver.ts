import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ProductsService } from '../../../services/products.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';

import { Product } from '../models/product';
import { CreateProductInput } from '../inputs/createProductInput';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  async products() {
    const products = await this.productsService.listAll();

    return products;
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  async createProduct(
    @Args('data')
    data: CreateProductInput,
  ) {
    const product = await this.productsService.create(data);

    return product;
  }
}
