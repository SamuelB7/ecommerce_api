import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class OrderProduct {
    @Field(() => String)
    id: string;

    @Field(() => String)
    orderId: string;

    @Field(() => String)
    productId: string;

    @Field(() => Int)
    quantity: number;

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date, { nullable: true })
    updatedAt?: Date

    @Field(() => Date, { nullable: true })
    deletedAt?: Date
}
