import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Purchase } from './purchase';

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
