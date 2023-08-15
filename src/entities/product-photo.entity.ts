import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class ProductPhoto {
    @Field(() => String)
    id: string;

    @Field(() => String)
    productId: string

    @Field(() => String)
    url: string

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date, { nullable: true })
    updatedAt?: Date

    @Field(() => Date, { nullable: true })
    deletedAt?: Date
}
