import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateJournalDto {
    
    @ApiProperty({
        description: 'The title of the journal entry.',
        example: 'Journal name',
        maxLength: 16,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(16)
    title:string

    @ApiProperty({
        description: 'The name of the game related to the journal entry.',
        example: 'The Legend of Zelda',
        maxLength: 100,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    game:string;

    @ApiProperty({
        description: 'The URL to the game or related content.',
        example: 'https://www.example.com/game',
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsUrl()
    @MaxLength(255)
    gameUrl:string;

}
