import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  providers: [ProductsResolver, ProductsService, PrismaService]
})
export class ProductsModule { }
