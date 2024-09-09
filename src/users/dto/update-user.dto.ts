import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateUserDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nickname:string

}
