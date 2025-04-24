import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('users')
export class UserEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string


    @ApiProperty()
    @IsString()
    @Column()
    name: string

    @ApiProperty()
    @IsString()
    @Column()
    email: string

    @ApiProperty()
    @IsString()
    @Column()
    password: string

    @ApiProperty()
    @CreateDateColumn()
    createdAt: string

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: string

}