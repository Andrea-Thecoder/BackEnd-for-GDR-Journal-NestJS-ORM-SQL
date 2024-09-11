import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes } from '@nestjs/common';
import { JournalService } from '../service/journal.service';
import { CreateJournalDto } from '../dto/create-journal.dto';
import { UpdateJournalDto } from '../dto/update-journal.dto';
import { Journal } from '../entities/journal.entity';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';

@Controller('/user/journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get(":userId")
  async findAllJournalByUserId(
    @Param("id",ParseIntPipe) userId:number):Promise<Journal[]>
  {
    return this.journalService.findAllJournalByUserId(userId);
  }
  
  
  @Post("/create/:id")
  @UsePipes(new ValidateDtoPipe(CreateJournalDto))
  async create(@Body() createJournalDto: CreateJournalDto) {
    return this.journalService.createJournal(createJournalDto);
  }

  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJournalDto: UpdateJournalDto) {
    return this.journalService.update(+id, updateJournalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journalService.remove(+id);
  }
}
