import { Resolver, Query } from '@nestjs/graphql';

import { ProductsService } from '../../services/products.service';
import { Product } from './models/product';

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  async products() {
    const products = await this.productsService.listAll();

    return products;
  }
}
