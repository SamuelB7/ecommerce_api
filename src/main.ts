import { NestApplication, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './guards/roles/roles.guard';

async function bootstrap() {
  const options = { cors: true } as NestApplicationOptions;

  const app = await NestFactory.create(AppModule, options);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}
bootstrap();
