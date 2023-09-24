import { Module } from '@nestjs/common';
import { AnalystController } from './analyst.controller';
@Module({
  controllers: [AnalystController],
})
export class AnalystModule {}
