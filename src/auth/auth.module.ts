import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './service/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'userKey', // Chiave segreta per firmare i token JWT
      signOptions: { expiresIn: '60m' }, // Il token scade in 60 minuti
    }),
    UsersModule, // Importa il modulo Users per verificare gli utenti
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}