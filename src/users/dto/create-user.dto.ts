import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { CreateUserProfileDto } from 'src/user-profile/dto/create-user-profile.dto';

//nota è nei DTO che si fanno i controlli vari.

export class CreateUserDto {

    @ApiProperty({
        description:"The nickname of the user.",
        example:"nickname"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nickname:string

    @ApiProperty({
        description:"The email address of the user.",
        example:"example@example.com"
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(100)
    email:string;

    @ApiProperty({
        description:"The password of the user.",
        example:"greaterPassword123"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password:string;

    @ApiProperty({
        description: "The profile information of the user.",
        type: CreateUserProfileDto 
    })
    @IsNotEmpty()
    @ValidateNested() //Serve per specificare che all'interno di questo DTO c'e un altro DTO annidiato.
    @Type(()=> CreateUserProfileDto ) //Indica che tipo di DTO verrà lavorato nell'annidamento. 
    profile:CreateUserProfileDto; 

}