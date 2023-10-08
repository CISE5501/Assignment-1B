import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStarRating } from './starRating.interface';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class StarRatingService {
  constructor(@InjectModel('StarRating') private articleModel: Model<IStarRating>) {}

  async createRating(createRatingDto: CreateRatingDto): Promise<IStarRating> {
    const newRating = await new this.articleModel(createRatingDto);
    return newRating.save();
  }

  async updateRating(updateRatingDto: UpdateRatingDto): Promise<IStarRating> {
    const { doi, userId } = updateRatingDto;
    const newRating = await this.articleModel.findOneAndUpdate({ doi, userId }, updateRatingDto);
    return newRating;
  }

  async addRating(ratingDto: CreateRatingDto): Promise<IStarRating> {
    const { doi, userId } = ratingDto;
    const existingRating = await this.articleModel.findOne({ doi, userId }).exec();
    if (existingRating) {
      return this.updateRating(ratingDto);
    } else {
      return this.createRating(ratingDto);
    }
  }

  async getAllRatings(): Promise<IStarRating[]> {
    const allRatings = await this.articleModel.find();
    return allRatings;
  }

  async getRatingsData(doi: string): Promise<IStarRating[]> {
    const allRatings = await this.getAllRatings();
    const filteredRatings = allRatings.filter((data) => data.doi === doi);
    return filteredRatings;
  }

  async getIndividualRatings(doi: string): Promise<number[]> {
    const ratingsData = await this.getRatingsData(doi);
    const starRatings = ratingsData.map((data) => data.rating);
    return starRatings;
  }

  async getAverageRating(doi: string): Promise<number | null> {
    // Get all star ratings
    const starRatings = await this.getIndividualRatings(doi);
    // Return null for unrated
    if (starRatings.length === 0) return null;
    // Calculate average
    const ratingsSum = starRatings.reduce((total, val) => total + val, 0);
    const avgRating = ratingsSum / starRatings.length;
    return avgRating;
  }
}
