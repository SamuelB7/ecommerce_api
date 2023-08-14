import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { UserRoleEnum } from 'src/enums/user-role.enum';

@InputType()
export class CreateUserInput {
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

  @Field()
  role?: UserRoleEnum;

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
