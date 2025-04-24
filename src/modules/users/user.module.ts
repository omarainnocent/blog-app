import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserController } from "./controller/user.controller";
import { UserService } from "./services/user.service";


@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                UserEntity
            ],
        )
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ]
})



export class UserModule {}