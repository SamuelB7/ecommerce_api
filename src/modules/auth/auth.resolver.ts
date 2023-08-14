import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/user-decorator';
import { AuthUser } from 'src/entities/auth-user.entity';
import { UserRegisterInput } from './dto/register-user.input';
import { LoginInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { AuthAccess } from 'src/entities/auth-access.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Query(() => AuthUser, { name: 'me' })
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AuthUser) {
    return user;
  }

  @Mutation(() => AuthAccess, { name: 'signUp' })
  signUp(@Args('signUpInput') signUpInput: UserRegisterInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthAccess, { name: 'signIn' })
  signIn(@Args('signInInput') signInInput: LoginInput) {
    return this.authService.signIn(signInInput);
  }
}
