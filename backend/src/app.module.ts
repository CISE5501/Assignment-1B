import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { ModeratorController } from './moderator/moderator.controller';
import { AnalystController } from './analyst/analyst.controller';
import { QueuedArticleSchema } from './models/queuedArticles/queuedArticle.schema';
import { QueuedArticleService } from './models/queuedArticles/queuedArticle.service';
import { ArticleSchema } from './models/articles/article.schema';
import { ArticleService } from './models/articles/article.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    MongooseModule.forFeature([
      { name: 'QueuedArticle', schema: QueuedArticleSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'Article', schema: ArticleSchema },
    ]),
  ],
  controllers: [
    AppController,
    ModeratorController,
    AnalystController,
    UserController,
  ],
  providers: [AppService, QueuedArticleService, ArticleService],
})
export class AppModule {}
