import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { UserEntity } from './users/entities/user.entity';
import { UserModule } from './users/user.module';
import { AuthModule } from './users/features/auth/auth.user.module';
import { BlogModule } from './blogs/blog.module';
import { BlogEntity } from './blogs/entities/blog.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<'DB_TYPE' | 'mysql'>('DB_TYPE', 'mysql'),
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),       
        entities: [ 
          UserEntity,
          BlogEntity,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    } as TypeOrmModuleAsyncOptions), // Add TypeOrmModuleAsyncOptions
    UserModule,
    AuthModule,
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }