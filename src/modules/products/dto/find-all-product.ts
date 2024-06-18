import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/entities/product.entity";

@ObjectType()
export class FindAllProduct {
    @Field(() => [Product])
    products: Product[]

    @Field(() => String)
    totalCount: number

}