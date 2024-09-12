import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users.service';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Users)
        private readonly userRepository:Repository<Users>,
        private readonly jwtService: JwtService //servizio del JWT è un integrato nella dipendenza
    ){}

    async validateUser(email: string, loginPassword: string): Promise<Omit<Users, 'password'>> {
        try    
            {if(!email || typeof email !=="string") throw new BadRequestException("Invalid email value");
                
                email = email.toLocaleLowerCase().trim();

            const user = await this.userRepository.findOne({where: {email}});
            if(!user) throw new NotFoundException(`User with this email: ${email} not exist!`); 
            //la soluzione qui è di fare la query interna. Ricordati queto doman iquando prosegui!
            const isMatch:boolean = await bcrypt.compare(loginPassword.trim(), user.password);
            if(!isMatch) throw new BadRequestException("Current Password is incorrect!");
            const {password,...result}= user;
            return result;
        } 
        catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) 
                throw error;
            throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
        }
    }

    async login(user: any) {
        const payload = { email: user.email, id: user.id }; // Dati inclusi nel token
        return {
          access_token: this.jwtService.sign(payload), // Firma il token
        };
      }


}
