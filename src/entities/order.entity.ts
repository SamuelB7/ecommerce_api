import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date

  @Field(() => Date, { nullable: true })
  deletedAt?: Date
}
