import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { Role } from 'src/decorators/roles-decorator';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { User } from 'src/entities/user.entity';
import { SearchUserParametersInput } from './dto/search-user-parameters.input';
import { PaginationArgs } from 'src/utils/graphql/pagination-args';

@UseGuards(JwtAuthGuard, RolesGuard)
@Role(UserRoleEnum.ADMIN)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation(() => User, { name: 'createUser' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'findAllUsers' })
  findAll(@Args('search', { nullable: true }) search?: SearchUserParametersInput, @Args({ nullable: true }) pagination?: PaginationArgs) {
    return this.usersService.findAll(search, pagination);
  }

  @Query(() => User, { name: 'findOneUser' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User, { name: 'removeUser' })
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
