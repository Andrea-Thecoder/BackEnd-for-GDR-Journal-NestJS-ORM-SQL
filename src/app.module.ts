import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/controller/users.controller';
import { UsersModule } from './users/users.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileModule } from './user-profile/user-profile.module';
import { APP_PIPE } from '@nestjs/core';
import { JournalModule } from './journal/journal.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //type di DB usato
      host: "localhost", //l'host del server, sottoforma di IP o domain
      port: 3306, //la porta 
      username: "root", //username del proprietario server
      password: "123456", //la pass del db
      database: "dnddb", //nome del db
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'], //lista delle entità create in Nestjs! possiamo inserire il nome di ogni entità oppure come scritto sopra ch se le cerca lui!
      //synchronize : true //USARE SOLO IN SVILUPPO! crea i schemi ogni qualvolta vnegano creati qui in ambiente di sviluppo.
    }),
    UsersModule,
    UserProfileModule,
    JournalModule,
    AuthModule
  ],
  controllers: [AppController, UsersController],
  providers: [{
    provide: APP_PIPE,
    useClass: ValidationPipe,

    },
    AppService
  ],
})
export class AppModule {}
