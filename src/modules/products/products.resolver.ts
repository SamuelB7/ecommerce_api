import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/decorators/roles-decorator';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { PaginationArgs } from 'src/utils/graphql/pagination-args';
import { Product } from '../../entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { FindAllProduct } from './dto/find-all-product';
import { SearchProductParametersInput } from './dto/search-product-parameters.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRoleEnum.ADMIN)
  @Mutation(() => Product, { name: 'createProduct' })
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => FindAllProduct, { name: 'findAllProducts' })
  findAll(@Args('search', { nullable: true }) search?: SearchProductParametersInput, @Args({ nullable: true }) pagination?: PaginationArgs) {
    return this.productsService.findAll(search, pagination);
  }

  @Query(() => Product, { name: 'findOneProduct' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRoleEnum.ADMIN)
  @Mutation(() => Product, { name: 'updateProduct' })
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.update(updateProductInput.id, updateProductInput);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRoleEnum.ADMIN)
  @Mutation(() => Product, { name: 'removeProduct' })
  removeProduct(@Args('id', { type: () => String }) id: string) {
    return this.productsService.remove(id);
  }
}
