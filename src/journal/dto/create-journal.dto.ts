import { IsNotEmpty, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateJournalDto {
    
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(16)
    title:string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    game:string;

    @IsNotEmpty()
    @IsUrl()
    @MaxLength(255)
    gameUrl:string;

    /* Qui forse andrà il pages dto, si valuterà 
    @IsNotEmpty()
    @ValidateNested() 
    @Type(()=> CreateUserProfileDto )
    profile:CreateUserProfileDto;  */

}
