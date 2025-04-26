import { Injectable, Logger, NotAcceptableException } from "@nestjs/common";
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
import { ExceptionEnum } from "src/common/enum/exception.enum";
import { access } from "fs";
import { JwtService } from "@nestjs/jwt";
import { JwtTokenPayloadModel } from "src/common/models/jwt-token-payload.model";


@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private readonly jwtService: JwtService,
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


    async login(dto: LoginDto): Promise<UserConnection> {
        this.logger.log(`Login attempt for email: ${dto.email}`);
        
        const admin = await this.userRepository.findOne(
            {
                where: {
                    email: dto.email,

                }
            }

        );
        
        if (!admin) {
          this.logger.warn(`Login failed - Admin not found for email: ${dto.email}`);
          throw new NotAcceptableException(ExceptionEnum.emailOrPasswordIncorrect);
        }
    
        const isPasswordValid = await bcrypt.compare(dto.password, admin.password);
        if (!isPasswordValid) {
          this.logger.warn(`Login failed - Invalid password for email: ${dto.email}`);
          throw new NotAcceptableException(ExceptionEnum.wrongPassword);
        }

        const connection = {
            accessToken: this.getAccessToken(admin),
            data: admin,
        }
        
        this.logger.log(`Successful login for admin: ${dto.email}`);
        return connection;
      }

      async getLoggedInUser(email: string): Promise<UserEntity> {
        this.logger.log(`Fetching logged-in user for email: ${email}`);
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        });
        
        if (!user) {
            this.logger.warn(`User not found for email: ${email}`);
            throw new NotAcceptableException(ExceptionEnum.emailOrPasswordIncorrect);
        }
        
        return user;
        
      }

      getAccessToken(admin: UserEntity): string {
        this.logger.debug(`Generating JWT token for admin ID: ${admin.id}`);
        const payload = <JwtTokenPayloadModel>(<unknown>{
          sub: admin.id,
          entityName: UserEntity.name,
        });
        return this.jwtService.sign(payload);
      }


}