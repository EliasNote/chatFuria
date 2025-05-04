import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://chatfuria-j6xx.onrender.com',
      'https://eliasnote.github.io',
      'https://eliasnote.github.io/chatFuria',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
