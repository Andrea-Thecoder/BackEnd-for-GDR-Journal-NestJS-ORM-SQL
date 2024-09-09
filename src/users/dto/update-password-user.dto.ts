import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class updateUserPasswordDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    currentPassword:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    newPassword:string;
}