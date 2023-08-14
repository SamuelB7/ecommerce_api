import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";


@InputType()
export class UserRegisterInput {
    @MaxLength(255)
    @IsNotEmpty()
    @Field()
    name: string;

    @MaxLength(255)
    @IsNotEmpty()
    @IsEmail()
    @Field()
    email: string;

    @MaxLength(255)
    @IsNotEmpty()
    @Field()
    password: string;
}