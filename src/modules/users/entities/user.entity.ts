import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";
import { Column, Entity } from "typeorm";


@Entity()
export class UserEntity {
    @ApiProperty()
    @IsString()
    @Column()
    name: string

}