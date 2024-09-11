import { Module } from '@nestjs/common';
import { JournalService } from './service/journal.service';
import { JournalController } from './controller/journal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from './entities/journal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Journal])],
  controllers: [JournalController],
  providers: [JournalService],
  exports:[JournalService]
})
export class JournalModule {}
