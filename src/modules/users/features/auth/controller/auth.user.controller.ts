import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../service/auth.user.service";
import { Email } from "src/common/dto/email.dto";
import { CreateUserDto } from "src/modules/users/dto/createUser.dto";
import { LoginDto } from "src/common/dto/login.dto";
import { U } from "framer-motion/dist/types.d-6pKw1mTI";
import { UserConnection } from "src/modules/users/models/user-connection.model";


@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
       
    }

   @Post('signup')
   @ApiOkResponse({type: Email})
    async signUp(@Body() dto: CreateUserDto): Promise<Email> {

        return this.authService.signUp(dto);
     }
    
     
    @Post('login')
    @ApiOkResponse({type: Email})
    async login(@Body() dto: LoginDto): Promise<UserConnection> {
        return this.authService.login(dto);
    }
}