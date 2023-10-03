import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRejectedEntry } from 'src/models/rejected/rejected.interface';
import { CreateRejectedEntryDto } from 'src/models/rejected/dto/create-entry.dto';

@Injectable()
export class RejectedEntryService {
  constructor(@InjectModel('RejectedEntry') private entryModel: Model<IRejectedEntry>) {}

  async addEntry(createEntryDto: CreateRejectedEntryDto): Promise<IRejectedEntry> {
    const newEntry = await new this.entryModel(createEntryDto);
    return newEntry.save();
  }

  async getEntry(doi: string): Promise<IRejectedEntry> {
    const existingEntry = await this.entryModel.find().where({ doi }).exec();
    if (!existingEntry || existingEntry.length === 0) {
      throw new NotFoundException(`Entry with DOI ${doi} not found`);
    }
    return existingEntry[0];
  }

  async deleteEntry(doi: string): Promise<IRejectedEntry> {
    const entryId = (await this.getEntry(doi))._id;
    const deletedEntry = await this.entryModel.findByIdAndDelete(entryId);
    if (!deletedEntry) {
      throw new NotFoundException(`Entry #${entryId} not found`);
    }
    return deletedEntry;
  }
}
