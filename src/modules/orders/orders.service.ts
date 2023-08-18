import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createOrderInput: CreateOrderInput) {
    const order = await this.prisma.order.create({
      data: {
        ...createOrderInput
      }
    })

    return order
  }

  async findAll() {
    const orders = await this.prisma.order.findMany()
    return orders
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id }
    })

    return order
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    const order = await this.prisma.order.update({
      where: { id },
      data: {
        ...updateOrderInput
      }
    })
  }

  async remove(id: string) {
    return await this.prisma.order.delete({
      where: { id }
    })
  }
}
