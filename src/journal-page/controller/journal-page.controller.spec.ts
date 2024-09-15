import { Test, TestingModule } from '@nestjs/testing';
import { JournalPageController } from './journal-page.controller';
import { JournalPageService } from '../service/journal-page.service'; 

describe('JournalPageController', () => {
  let controller: JournalPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JournalPageController],
      providers: [JournalPageService],
    }).compile();

    controller = module.get<JournalPageController>(JournalPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
