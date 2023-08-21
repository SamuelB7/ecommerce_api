import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
class OrderProductInput {
  @Field()
  productId: string;

  @Field()
  quantity: number;
}
@InputType()
export class CreateOrderInput {
  @Field()
  userId: string;

  @Field(() => [OrderProductInput])
  orderProducts: OrderProductInput[];
}
