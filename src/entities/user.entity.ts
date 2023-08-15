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

    @Field({ nullable: true })
    country?: string;

    @Field({ nullable: true })
    state?: string;

    @Field({ nullable: true })
    city?: string;

    @Field({ nullable: true })
    street?: string;

    @Field({ nullable: true })
    zipCode?: string;

    @Field({ nullable: true })
    addressComplement?: string;
}