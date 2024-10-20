import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/');
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    // origin: 'https://localhost:3000'
  });

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
