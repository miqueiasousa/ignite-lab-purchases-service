import path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import { DatabaseModule } from '../database/database.module';
import { ProductsService } from '../services/products.service';
import { PurchasesService } from '../services/purchases.service';
import { CustomersService } from '../services/customers.service';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    ProductsService,
    PurchasesService,
    CustomersService,
    ProductsResolver,
    PurchasesResolver,
    CustomersResolver,
  ],
})
export class HttpModule {}
