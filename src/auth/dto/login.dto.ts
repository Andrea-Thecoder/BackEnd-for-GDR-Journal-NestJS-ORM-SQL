import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class LoginDto {
   
    @ApiProperty({
        description: 'The email address of the user.',
        example: 'example@example.com',
        maxLength: 100,
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(100)
    email:string;

    @ApiProperty({
        description: 'The password of the user.',
        example: 'greaterPassword123',
        minLength: 8,
        maxLength: 16,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password:string;
}
