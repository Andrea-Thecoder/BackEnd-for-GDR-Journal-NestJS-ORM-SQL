import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { CreateUserProfileDto } from 'src/user-profile/dto/create-user-profile.dto';

//nota è nei DTO che si fanno i controlli vari.

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nickname:string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)

    email:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password:string;

    @IsNotEmpty()
    @ValidateNested() //Serve per specificare che all'interno di questo DTO c'e un altro DTO annidiato.
    @Type(()=> CreateUserProfileDto ) //Indica che tipo di DTO verrà lavorato nell'annidamento. 
    profile:CreateUserProfileDto; 

}