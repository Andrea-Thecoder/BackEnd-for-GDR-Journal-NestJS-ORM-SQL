import { IsEmail, IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class LoginDto {
   
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(100)
    email:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password:string;
}
