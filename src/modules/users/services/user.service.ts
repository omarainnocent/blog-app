import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/createUser.dto";
import { UpdateUserDto } from "../dto/updateUser.dto";



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){

    }

    //CRUD - Create, Read, Update and Delete

    async getAllUsers() {
        const users = await this.userRepository.find();
        return users
    }

    //create user
    async createUser(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    // Read
    async getOneUser(id: string) {
        const user = await this.userRepository.findOne({ where: { id } });
        return user
    }


    // Update
    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            return null
        }
        await this.userRepository.update(id, updateUserDto);
        return await this.userRepository.findOne({ where: { id } });
    }


    // Delete
    async deleteUser(id: string) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            return null
        }
        await this.userRepository.delete(id);
        return user
    }

    
}