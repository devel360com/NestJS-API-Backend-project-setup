import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Añade esta línea para establecer un prefijo global
  app.enableCors(); // Habilita CORS si es necesario
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
