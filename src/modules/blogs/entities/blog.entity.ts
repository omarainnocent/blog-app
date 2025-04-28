import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('blogs')
export class BlogEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string


    @ApiProperty()
    @IsString()
    @Column()
    title: string

    @ApiProperty()
    @IsString()
    @Column()
    content: string


    @ApiProperty()
    @CreateDateColumn()
    createdAt: string

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: string

}