import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserProfileDto {

    @ApiProperty({
        description: "The first name of the user.",
        example: "John"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name:string;

    @ApiProperty({
        description: "The lastname of the user.",
        example: "Doe"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    lastname:string;

    @ApiProperty({
        description: "The country where live the user.",
        example: "Italy"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    country:string;

    @ApiProperty({
        description: "The birthdate of the user.",
        example: "2024-09-15"
    })
    @IsNotEmpty()
    @IsDate()
    @Type(()=> Date)
    birthDate: Date;

}
