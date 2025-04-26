import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { CONFIG_JWT_SECRET } from "src/config/app.config";
import { UserModule } from "../../user.module";
import { AuthService } from "./service/auth.user.service";
import { AuthController } from "./controller/auth.user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../entities/user.entity";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: CONFIG_JWT_SECRET,
            signOptions: {
                expiresIn: '7d',
            }
        }),
        UserModule,
        TypeOrmModule.forFeature([
            UserEntity
    ])
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
    ],
    exports: [],
})

export class AuthModule {}