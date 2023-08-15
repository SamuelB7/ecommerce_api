import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from 'src/entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const passwordHash = await hash(createUserInput.password, 10);

      const user = await this.prisma.user.create({
        data: {
          ...createUserInput,
          password: passwordHash
        }
      })

      return user
    } catch (error) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany()
      return users
    } catch (error) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id
        }
      })

      return user
    } catch (error) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    try {
      const passwordHash = await hash(updateUserInput.password, 10);

      const user = await this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          ...updateUserInput,
          password: passwordHash
        }
      })

      return user
    } catch (error) {
      console.error(error)
      throw new Error(error.message)
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: id
        }
      })
    } catch (error) {
      console.error(error)
      throw new Error(error.message)
    }
  }
}
