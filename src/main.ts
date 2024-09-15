import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SanitizeHtmlPipe } from './common/pipes/sanificate-html.pipe';
import { AllExceptionsFilter } from './common/filters/all-error-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(),new SanitizeHtmlPipe()); //necessaria per abilitare a livello globale le pipe di validazione*.
  app.useGlobalFilters(new AllExceptionsFilter()); //utilizza a livello globaile il filtro dgli errori.
  await app.listen(8080);
}
bootstrap();


/* 
  *I validator pipe sono necessari per far funzionare i decorator dei DTO.
*/