import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthResolver, AuthService, JwtStrategy, PrismaService]
})
export class AuthModule { }
