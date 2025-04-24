import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/createUser.dto";
import { UserEntity } from "../entities/user.entity";


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
}