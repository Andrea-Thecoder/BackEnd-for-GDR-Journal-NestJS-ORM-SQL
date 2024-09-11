import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService, //servizio degli utenti
        private readonly jwtService: JwtService //servizio del JWT è un integrato nella dipendenza
    ){}

    async validateUser(email: string, password: string): Promise<any> {
        try    
            {if(!email || typeof email !=="string") throw new BadRequestException("Invalid email value");
                
                email = email.toLocaleLowerCase().trim();

            const user = await this.usersService.findUserByEmail(email);
            //la soluzione qui è di fare la query interna. Ricordati queto doman iquando prosegui!
            const isMatch:boolean = await bcrypt.compare(password.trim(), user.password);

            //verifica esistenza utente e correttezza delle password
            if (user && isMatch) {
            const { password, ...result } = user; //destruttura l'oggetto per rimuovere la apssword dai risultati
            return result; 
            }
        } 
        catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
               throw error;
           }
           throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
       }

      }


}
