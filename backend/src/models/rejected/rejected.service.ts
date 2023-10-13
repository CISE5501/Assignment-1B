import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRejectedEntry } from 'src/models/rejected/rejected.interface';
import { CreateRejectedEntryDto } from 'src/models/rejected/dto/create-entry.dto';

/*
  Exports functions that can be used to interact with the 'rejected' database:
    - Get all rejected entries
    - Get a specified reject entry
    - Create a new rejected entry
    - Delete specified reject entry
*/

@Injectable()
export class RejectedEntryService {
  constructor(@InjectModel('RejectedEntry') private entryModel: Model<IRejectedEntry>) {}

  async getAllEntries(): Promise<IRejectedEntry[]> {
    const entries = await this.entryModel.find().exec();
    if (!entries || entries.length === 0) {
      throw new NotFoundException(`No entries found`);
    }
    return entries;
  }

  async getEntry(doi: string): Promise<IRejectedEntry> {
    const entries = await this.entryModel.find().where({ doi }).exec();
    if (!entries || entries.length === 0) {
      throw new NotFoundException(`Entry with DOI ${doi} not found`);
    }
    return entries[0];
  }

  async addEntry(createEntryDto: CreateRejectedEntryDto): Promise<IRejectedEntry> {
    try {
      this.getEntry(createEntryDto.doi);
      // Throws if entry is not present
      return null;
    } catch {
      // Create new entry
      const newEntry = await new this.entryModel(createEntryDto);
      return newEntry.save();
    }
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
