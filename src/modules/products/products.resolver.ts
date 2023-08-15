import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from '../../entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Role } from 'src/decorators/roles-decorator';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { SearchProductParametersInput } from './dto/search-product-parameters.input';
import { PaginationArgs } from 'src/utils/graphql/pagination-args';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRoleEnum.ADMIN)
  @Mutation(() => Product, { name: 'createProduct' })
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'findAllProducts' })
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
