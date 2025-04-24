import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";




export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty()
   readonly name: string;


    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly password: string;
    
}