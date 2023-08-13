import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    if (context.getType() !== 'http') {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    } else {
      return (context as any).args?.[0]
    }
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new Error('Unauthorized');
    }
    return user;
  }
}
