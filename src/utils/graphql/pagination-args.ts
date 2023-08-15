import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class PaginationArgs {
    @Field(() => Int, { nullable: true })
    limit = 20;

    @Field(() => Int, { nullable: true })
    offset = 0;
}