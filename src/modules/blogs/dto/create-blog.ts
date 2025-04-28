import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";




export class CreateBlogDto {
    @IsNotEmpty()
    @ApiProperty()
    readonly title: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly content: string;
    
}