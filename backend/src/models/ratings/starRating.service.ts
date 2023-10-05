import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStarRating } from './starRating.interface';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class StarRatingService {
  constructor(@InjectModel('StarRating') private articleModel: Model<IStarRating>) {}

  async createRating(createRatingDto: CreateRatingDto): Promise<IStarRating> {
    const newRating = await new this.articleModel(createRatingDto);
    return newRating.save();
  }
}
