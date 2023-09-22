import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './controller/article/article.controller';
import { ArticleSchema } from './schema/article.schema';
import { ArticleService } from './service/article/article.service';
import {ConfigModule, ConfigService} from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule], 
            inject: [ConfigService], 
            useFactory: async(config: ConfigService) => ({uri: config.get<string>('MONGO_URI')})
        }),
        MongooseModule.forFeature([{name: "Article", schema: ArticleSchema}])
    ],
    controllers: [AppController, ArticleController],
    providers: [AppService, ArticleService],
})
export class AppModule {}