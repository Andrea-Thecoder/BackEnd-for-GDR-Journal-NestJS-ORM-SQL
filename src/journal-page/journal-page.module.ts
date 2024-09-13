import { Module } from '@nestjs/common';
import { JournalPageService } from './service/journal-page.service';
import { JournalPageController } from './controller/journal-page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalPage } from './entities/journal-page.entity';
import { JournalService } from 'src/journal/service/journal.service';
import { Journal } from 'src/journal/entities/journal.entity';
@Module({
  imports:[TypeOrmModule.forFeature([JournalPage,Journal])],
  controllers: [JournalPageController],
  providers: [JournalPageService,JournalService],
  exports:[JournalPageService]
})
export class JournalPageModule {}
