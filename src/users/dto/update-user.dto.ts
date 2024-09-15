import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateUserDto {

    @ApiProperty({
        description:"The nickname of the user.",
        example:"nickname"
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nickname:string

}
