import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserProfileDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name:string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    lastname:string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    country:string;

    @IsNotEmpty()
    @IsDate()
    @Type(()=> Date)
    birthDate: Date;

}
