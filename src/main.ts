import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //necessaria per abilitare a livello globale le pipe di validazione*.
  await app.listen(8080);
}
bootstrap();


/* 
  *I validator pipe sono necessari per far funzionare i decorator dei DTO.
*/