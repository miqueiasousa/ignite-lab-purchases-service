import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product } from './product';

enum PurchaseStatus {
  PENDING = 'PENDING',
  APPORVED = 'APPORVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchaseStatus, { name: 'PurchaseStatus' });

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status: PurchaseStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Product)
  product: Product;

  productId: string;
}
