import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/createUser.dto";
import { UserEntity } from "../entities/user.entity";
// import { U } from "framer-motion/dist/types.d-6pKw1mTI";
import { UpdateUserDto } from "../dto/updateUser.dto";


@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
       
    }

   @Get()
   async getAllUsers() {
        const users = await this.userService.getAllUsers();
        return users
    }

    //create user
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.userService.createUser(createUserDto);
        return user
    }
    
    // Read 
    @Get(':id')
    async getOneUser(@Param('id') id: string) {
        const user = await this.userService.getOneUser(id);
        return user
    }

    // Update
    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.userService.updateUser(id, updateUserDto);
        return user
    }
    // Delete   
    @Delete(':id/delete')
    async deleteUser(@Param('id') id: string) {
        const user = await this.userService.deleteUser(id);
        return user
    }
    //delete all users
    @Delete('deleteAll')
    async deleteAllUsers() {
        const users = await this.userService.deleteAllUser();
        return users
    }     
}