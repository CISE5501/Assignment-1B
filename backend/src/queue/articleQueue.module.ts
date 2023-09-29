import { Module } from '@nestjs/common';
import { QueueController } from './articleQueue.controller';
@Module({
  controllers: [QueueController],
})
export class QueueModule {}
