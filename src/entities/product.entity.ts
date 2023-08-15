import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => Float)
  price: number

  @Field(() => Boolean)
  isAvailable: boolean

  @Field(() => String)
  category: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date

  @Field(() => Date, { nullable: true })
  deletedAt?: Date
}
