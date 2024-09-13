import { Test, TestingModule } from '@nestjs/testing';
import { JournalPageService } from './journal-page.service';

describe('JournalPageService', () => {
  let service: JournalPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JournalPageService],
    }).compile();

    service = module.get<JournalPageService>(JournalPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
