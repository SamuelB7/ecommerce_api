import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class SearchProductParametersInput {
    @Field({ nullable: true })
    name?: string;

    @Field(() => Float, { nullable: true })
    price?: number

    @Field(() => Boolean, { nullable: true })
    isAvailable?: boolean

    @Field(() => String, { nullable: true })
    category?: string
}