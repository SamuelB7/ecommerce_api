import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductRating {
    @Field(() => String)
    id: string;

    @Field(() => String)
    productId: string;

    @Field(() => Number)
    rating: number;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date

    @Field(() => Date, { nullable: true })
    deletedAt?: Date
}