import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Email } from "src/common/dto/email.dto";
import { CreateUserDto } from "src/modules/users/dto/createUser.dto";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { UserService } from "src/modules/users/services/user.service";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { CONFIG_PASSWORD_HASH_SALT } from "src/config/app.config";
import { LoginDto } from "src/common/dto/login.dto";
import { UserConnection } from "src/modules/users/models/user-connection.model";


@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private readonly userService: UserService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){
        
    }
    
    //signup here
    async signUp(dto:CreateUserDto): Promise<Email>{

        this.logger.log('creating user account now...')

        const existingEmail = await this.userRepository.findOne({
            where: {
                email: dto.email
            }
        })

        if(existingEmail){
            this.logger.warn('user already exists')
            throw new Error('user already exists')
        }

        //hash the password
        const hashedPasword = await bcrypt.hash(
            dto.password,
            CONFIG_PASSWORD_HASH_SALT
        )


        await this.userRepository.save({
            ...dto,
            password: hashedPasword
        })

        await this.logger.debug('User created successfully')
        return {
            email: dto.email
        }

        

    }

    //Login Here
    async login(dto: LoginDto): Promise<UserConnection> {
        this.logger.log(`logging in user ${dto.email}`);

        const user = await this.userRepository.findOne(
            {
                where: {
                    email: dto.email
                }
            }
        );

        if (!user) {
            this.logger.warn(`Login failed for user ${dto.email}: user not found`);
            throw new Error('User not found');
        }


    }
}