import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Product } from 'src/entities/product.entity';
import { SearchProductParametersInput } from './dto/search-product-parameters.input';
import { PaginationArgs } from 'src/utils/graphql/pagination-args';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    try {
      const product = await this.prisma.product.create({
        data: {
          ...createProductInput
        }
      })

      return product
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async findAll(search?: SearchProductParametersInput, { limit, offset } = new PaginationArgs()) {
    try {
      let where: Prisma.ProductWhereInput = {}

      if (search?.name) {
        where = {
          ...where,
          AND: [{ name: search.name }]
        }
      }

      if (search?.price) {
        where = {
          ...where,
          AND: [{ price: search.price }]
        }
      }

      if (search?.category) {
        where = {
          ...where,
          AND: [{ category: search.category }]
        }
      }

      if (search?.isAvailable) {
        where = {
          ...where,
          AND: [{ isAvailable: search.isAvailable }]
        }
      }

      const totalCount = await this.prisma.product.count({ where })

      const products = await this.prisma.product.findMany({
        skip: offset,
        take: limit,
        where: where,
        include: {
          photos: true,
          rating: true
        }
      })

      const productsWithAverageRating = products.map(product => {
        const ratingsCount = product.rating.length
        const ratingsSum = product.rating.reduce((acc, rating) => acc + rating.rating, 0)
        return {
          ...product,
          averageRating: ratingsCount > 0 ? ratingsSum / ratingsCount : 0
        }
      })

      return productsWithAverageRating
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id: id
        },
        include: {
          photos: true,
          rating: true
        }
      })

      const ratingsCount = product.rating.length
      const ratingsSum = product.rating.reduce((acc, rating) => acc + rating.rating, 0)

      return {
        ...product,
        averageRating: ratingsCount > 0 ? ratingsSum / ratingsCount : 0
      }
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async update(id: string, updateProductInput: UpdateProductInput): Promise<Product> {
    try {
      const product = await this.prisma.product.update({
        where: {
          id: id
        },
        data: {
          ...updateProductInput
        }
      })

      return product
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.product.delete({
        where: {
          id: id
        }
      })
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }
}
