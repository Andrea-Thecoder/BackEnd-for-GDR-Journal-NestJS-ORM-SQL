import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/controller/users.controller';
import { UsersModule } from './users/users.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileModule } from './user-profile/user-profile.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JournalModule } from './journal/journal.module';
import { AuthModule } from './auth/auth.module';
import { JournalPageModule } from './journal-page/journal-page.module';
import { RateLimiterModule } from 'nestjs-rate-limiter'; //serve per limitare il numero di rciheste in u ndetermianto arco temporale, aiutando cosi nella prevenzione da attacchi DoS! può essere anche usato tramite decorator nei controller
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60, //in in millisecondi
      limit: 10, //limite di ping allo stesso endpoint nll'arco di tempo sopracitato.
    }]),
    TypeOrmModule.forRoot({
      type: 'mysql', //type di DB usato
      host: "localhost", //l'host del server, sottoforma di IP o domain
      port: 3306, //la porta 
      username: "root", //username del proprietario server
      password: "123456", //la pass del db
      database: "dnddb", //nome del db
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'], //lista delle entità create in Nestjs! possiamo inserire il nome di ogni entità oppure come scritto sopra ch se le cerca lui!
      //synchronize : true //USARE SOLO IN SVILUPPO! crea i schemi ogni qualvolta vnegano creati qui in ambiente di sviluppo.
      //logging: true //serve per attivare il log nel terminare
    }),
    UsersModule,
    UserProfileModule,
    JournalModule,
    AuthModule,
    JournalPageModule
  ],
  controllers: [AppController, UsersController],
  providers: [{
    provide: APP_PIPE,
    useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService
  ],
})
export class AppModule {}
