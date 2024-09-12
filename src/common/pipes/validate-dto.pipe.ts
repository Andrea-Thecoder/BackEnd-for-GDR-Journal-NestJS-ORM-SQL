import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';



@Injectable()
export class ValidateDtoPipe implements PipeTransform{

    //nel costruttore inseriamo l'assegnazione al dto che passeremo per farlo confrontare
    constructor(private readonly dtoClass: any) {}

    transform(value:any){

        const instanceOfDto = plainToInstance(this.dtoClass, value);

        // Valida l'istanza del DTO e verifica eventuali errori
        const errors:ValidationError[] = validateSync(instanceOfDto, { whitelist: true, forbidNonWhitelisted: true });
        
        //in caso l'array di errori sia compsoto da campi, ovvero maggiore di 0, lancia un errore 
        if (errors.length > 0) 
            throw new BadRequestException("Not expected field(s) in the body, request rejected! " + errors);

        return instanceOfDto;

    }
}
