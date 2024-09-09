import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { capitalizeFirstLetter } from 'src/utils/utils';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';
import { updateUserPasswordDto } from '../dto/update-password-user.dto';

//il service funziona esattamente come i service di Java springboot quind iqui va la logica di gestione.
//il service ha bisogno del repository injector preso dalla dipendenza di typeORM

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)//nome dell'entità
        private readonly usersRepository:Repository<Users>,
    ){}

    //il repository funziona come quand oestendavamo il DTO in java ovvero offre dei method nativi per fare query prefatte sul DB.
    async findAll():Promise<Users[]>{
        try{ //ricorda con async await c'e quasi sempre necessità del blocco try catch, esso gestisce handling degli errori legati all'asincronismo.
            const users:Users[] = await this.usersRepository.find();
            //notfound si usa quando la query non restituisce nulla
            if(users.length <= 0) throw new NotFoundException("No users are in DB");
            return users;
        }
        catch(error){
            if (error instanceof NotFoundException) {
                throw error;
            }
            //internalservererrorexception è status 500 si usa per i problemi d/nel db.
            throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
        }
    }

    async findUserById(id:number):Promise<Users> {
        try{
            if (!id || id<=0) throw new BadRequestException("Id value no permitted. They be positive and greater than 0");

            const user:Users | null = await this.usersRepository.findOne({where: {id}});
            if(!user) 
                throw new NotFoundException(`Not exist user with id: ${id}`); 
            
            return user;
        }
        catch(error){
            //inseriamo un controllo di instanza di errore per capire che tipo di errore sia, in questo modo non somma i messaggi personalizzati e non mette tutto nello status 500.
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
        }
    }

    async createUser(userDto:CreateUserDto):Promise<Users> {
        try{
            //normalizzazione dei dati
            const userDtoClear:CreateUserDto = await this.capitalizeDtoObject<CreateUserDto>(userDto);
            const {email} = userDtoClear

            //Ricerca dell'user, se esiste deve throw un errore i nquanto non si può creare l'account
            const userExist:Users = await this.usersRepository.findOne({where :{email:email}})
            if(userExist) throw new BadRequestException("Email(and user) already exist!")

            //il repository ha la funzione Crea, che prepara l'oggetto per poi essre salvato nel db. in caso di relazioni 1:1 possiamo inserire direttamente i dati della tabella dipendente dalla principale (ovvero dove c'e la FK) nell'oggetto che esso viene qui creato, creando cosi di fatto la relazione autoamticamente. assenga in modo automatico i campi AI (auto generanti) e la FK. Nota: questo è un metodo automatizato da typeORM , in alternativa avremmo potuto creare un istanza nel classico modo (come ho appreso su java).
            const newUser:Users = this.usersRepository.create(userDtoClear);

            //esegue il POST sul DB di fatto, inserendo nella query i valori dell'oggetto sopra stante.
            const savedUser= await this.usersRepository.save(newUser);
            if(!savedUser) throw new InternalServerErrorException('Failed to save user. The operation was not successful.')
            return savedUser; 
        }
        catch(error){
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
        }
    }


    async deleteUser(id:number):Promise<Users>{

        try {
            if (!id || id<=0) throw new BadRequestException("Id value no permitted. They be positive and greater than 0");

            const user:Users | null = await this.usersRepository.findOne({where: {id}});
            if(!user) throw new  BadRequestException("User not exist!")

            //ritorna l'intera entità che è stata cancellata.
            const deletedUser: Users = await this.usersRepository.remove(user);

            return deletedUser;

        }
        catch(error){
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
        }
    }

    async updateUser(id:number,updateDto:UpdateUserDto):Promise<Users>{

        try{
            if (!id || id<=0) throw new BadRequestException("Id value no permitted. They be positive and greater than 0");

            const user:Users | null = await this.usersRepository.findOne({where: {id}});
            if(!user) throw new  BadRequestException("User not exist!")
            
            
            //in caso il campo nickname sia presente allora sovrascrivo la proprietà dell'oggetto user, preparandola per il salvataggio. In questo timing è ancora solo locale.
            if(updateDto.nickname)
                user.nickname = capitalizeFirstLetter(updateDto.nickname);

            //infine eseguiamo un save classico.
            return await this.usersRepository.save(user);
        }
        catch(error){
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
        }
    }

    async updateUserPassword(id:number, passwordDto:updateUserPasswordDto ): Promise<Users> {
    try{
        if (!id || id<=0) throw new BadRequestException("Id value no permitted. They be positive and greater than 0");

        const user:Users | null = await this.usersRepository.findOne({where: {id}});
        if(!user) throw new  BadRequestException("User not exist!")

        const {currentPassword, newPassword} = passwordDto;

        //confronto per valutare se le password coincido, e proseguire col cambio. Security step!
        const isMatch:boolean = await bcrypt.compare(currentPassword, user.password);
        if(!isMatch) throw new BadRequestException("Current Password is incorrect!")
        
        //criptazione nuova password
        const hashedNewPass:string = await this.encryption(newPassword);

        //salvataggio della nuova password nel campo user, l'oggetto locale.
        user.password = hashedNewPass;
    
        //salvataggio nel db della nuova password!E 
        return await this.usersRepository.save(user);
    }
    catch(error){
        if (error instanceof NotFoundException || error instanceof BadRequestException) {
            throw error;
        }
        throw new InternalServerErrorException ("Error while retrieving data. " + error.message);
    }

    }





    //siccome abbiamo usato una tipizzazione Generica, che varia ogni volta che verrà chiamata la funzione, dobbiamo inserire un as any come Cast per ogni assegnazione per evitare possibili problemi di tipizzazione.
    private async capitalizeDtoObject <T>(dto: T):Promise<T> {

        for (let [key,value] of Object.entries(dto)){

            if (typeof value === "string" && key != "email") 
                dto[key] = capitalizeFirstLetter(value) as any;
            if(typeof value === "string" && key === "email")
                dto[key] = value.toLowerCase().trim() as any;   
            if(typeof value === "string" && key === "password") 
                dto[key] = await this.encryption(value) as any;
            if(typeof value === 'object'){
                for (let [subKey,subValue]of Object.entries(value)){
                    if (typeof subValue != "string") continue;
                    value[subKey] = capitalizeFirstLetter(subValue) as any;
                }
            }
        };
        return dto;
    }

    private async encryption(password: string): Promise<string> {
        const saltRounds:number = 10;
        try {
            password = password.trim();
          return await bcrypt.hash(password, saltRounds);
        } catch (err) {
          throw new InternalServerErrorException('Error encrypting password');
        }   
    }

}
