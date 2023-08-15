import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from 'src/entities/user.entity';
import { hash } from 'bcrypt';
import { SearchUserParametersInput } from './dto/search-user-parameters.input';
import { PaginationArgs } from 'src/utils/graphql/pagination-args';
import { Prisma } from '@prisma/client';
import { fi } from '@faker-js/faker';

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

  async findAll(search?: SearchUserParametersInput, { limit, offset } = new PaginationArgs()): Promise<User[]> {
    try {
      let where: Prisma.UserWhereInput = {}

      if (search?.name) {
        where = {
          ...where,
          AND: [{ name: search.name }]
        }
      }

      if (search?.email) {
        where = {
          ...where,
          AND: [{ name: search.email }]
        }
      }

      if (search?.role) {
        where = {
          ...where,
          AND: [{ name: search.role }]
        }
      }

      if (search?.country) {
        where = {
          ...where,
          AND: [{ name: search.country }]
        }
      }

      if (search?.state) {
        where = {
          ...where,
          AND: [{ name: search.state }]
        }
      }

      if (search?.city) {
        where = {
          ...where,
          AND: [{ name: search.city }]
        }
      }

      const users = await this.prisma.user.findMany({
        skip: offset,
        take: limit,
        where: where
      })

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
