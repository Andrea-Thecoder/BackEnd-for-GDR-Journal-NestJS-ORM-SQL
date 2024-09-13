import { PartialType } from '@nestjs/mapped-types';
import { CreateJournalPageDto } from './create-journal-page.dto';


export class UpdateJournalPageDto extends PartialType(CreateJournalPageDto) {}
