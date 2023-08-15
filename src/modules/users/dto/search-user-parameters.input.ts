import { Field, InputType } from "@nestjs/graphql";
import { UserRoleEnum } from "src/enums/user-role.enum";

@InputType()
export class SearchUserParametersInput {
    @Field()
    name?: string;

    @Field()
    email?: string;

    @Field(() => UserRoleEnum)
    role: UserRoleEnum | string;

    @Field({ nullable: true })
    country?: string;

    @Field({ nullable: true })
    state?: string;

    @Field({ nullable: true })
    city?: string;
}