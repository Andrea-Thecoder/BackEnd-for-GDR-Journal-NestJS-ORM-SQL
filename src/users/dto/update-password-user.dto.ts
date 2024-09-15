import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class updateUserPasswordDto {

    @ApiProperty({
        description:"The current password of the user.",
        example:"currentPassword123"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    currentPassword:string;

    @ApiProperty({
        description:"The new password user want use.",
        example:"newPassword123"
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    newPassword:string;
}