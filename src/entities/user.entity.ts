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

    @Field()
    role: UserRoleEnum;

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