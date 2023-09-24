import { Module } from '@nestjs/common';
import { ModeratorController } from './moderator.controller';
@Module({
  controllers: [ModeratorController],
})
export class ModeratorModule {}