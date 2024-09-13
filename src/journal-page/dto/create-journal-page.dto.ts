import { IsNotEmpty, IsString } from "class-validator";

export class CreateJournalPageDto {
    
    @IsNotEmpty()
    @IsString()
    text:string
}


