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
import { RejectedEntrySchema } from './models/rejected/rejected.schema';
import { RejectedEntryService } from './models/rejected/rejected.service';
import { StarRatingSchema } from './models/ratings/starRating.schema';
import { StarRatingService } from './models/ratings/starRating.service';

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
    //connects to different collections within the database
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: 'QueuedArticle', schema: QueuedArticleSchema }]),
    MongooseModule.forFeature([{ name: 'RejectedEntry', schema: RejectedEntrySchema }]),
    MongooseModule.forFeature([{ name: 'StarRating', schema: StarRatingSchema }]),
  ],
  controllers: [AppController, ModeratorController, AnalystController, UserController],
  providers: [AppService, ArticleService, QueuedArticleService, RejectedEntryService, StarRatingService],
})
export class AppModule {}
