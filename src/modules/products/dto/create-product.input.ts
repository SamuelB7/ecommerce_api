import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateProductInput {
  @MaxLength(255)
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  description: string;

  @IsNotEmpty()
  @Field()
  price: number;

  @IsNotEmpty()
  @Field()
  category: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field()
  isAvailable: boolean;
}
