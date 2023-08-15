import { Field, ObjectType } from "@nestjs/graphql";
import { UserRoleEnum } from "src/enums/user-role.enum";

@ObjectType()
export class User {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field(() => UserRoleEnum)
    role: UserRoleEnum | string;

    @Field()
    country?: string;

    @Field()
    state?: string;

    @Field()
    city?: string;

    @Field()
    street?: string;

    @Field()
    zipCode?: string;

    @Field()
    addressComplement?: string;
}