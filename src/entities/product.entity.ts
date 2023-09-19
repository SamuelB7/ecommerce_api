import { ObjectType, Field, Float } from '@nestjs/graphql';
import { ProductPhoto } from './product-photo.entity';
import { ProductRating } from './product-rating.entity';

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

  @Field(() => [ProductPhoto], { nullable: true })
  photos?: ProductPhoto[]

  @Field(() => [ProductRating], { nullable: true })
  rating?: ProductRating[]

  @Field(() => Number, { nullable: true })
  averageRating?: number

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date

  @Field(() => Date, { nullable: true })
  deletedAt?: Date
}
