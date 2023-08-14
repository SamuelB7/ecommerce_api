import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './guards/roles/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
