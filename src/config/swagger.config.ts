import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Roleplaying Backend - API') // Titolo della documentazione
    .setDescription("These APIs have been developed to perform CRUD operations for a project aimed at creating a platform (FE + BE) where role-playing game (RPG) players can write and manage their adventure journals, containing all the information related to their adventures. The endpoints are designed to handle authentication, user management, user profiles, their journals, and individual journal pages.") // Descrizione della documentazione
    .setVersion('1.0') // Versione dell'API
    .addBearerAuth() // Aggiungi autenticazione Bearer se necessario
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('rpg-api', app, document); // Imposta l'endpoint della documentazione
}