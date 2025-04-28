import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogEntity } from "./entities/blog.entity";
import { BlogController } from "./controller/blogs.controller";
import { blogService } from "./services/blogs.service";


@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                BlogEntity
            ],
        )
    ],
    controllers: [
        BlogController
    ],
    providers: [
        blogService
    ],
    exports: [
        blogService
    ]
})



export class BlogModule {}