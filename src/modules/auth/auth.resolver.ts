import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/user-decorator';
import { AuthUser } from 'src/entities/auth-user.entity';
import { UserRegisterDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { AuthAccess } from 'src/entities/auth-access.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Query(() => AuthUser, { name: 'me' })
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: any) {
    return user;
  }

  @Mutation(() => AuthAccess, { name: 'signUp' })
  signUp(@Args('signUpInput') signUpInput: UserRegisterDto) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthAccess, { name: 'signIn' })
  signIn(@Args('signInInput') signInInput: LoginDto) {
    return this.authService.signIn(signInInput);
  }
}
