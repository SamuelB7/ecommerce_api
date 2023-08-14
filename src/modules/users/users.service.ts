import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createUserInput: CreateUserInput) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserInput
      }
    })

    return user
  }

  async findAll() {
    const users = await this.prisma.user.findMany()
    return users
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })

    return user
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        ...updateUserInput
      }
    })

    return user
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id: id
      }
    })
  }
}
