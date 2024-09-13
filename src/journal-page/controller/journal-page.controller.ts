import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards, UsePipes } from '@nestjs/common';
import { JournalPageService } from '../service/journal-page.service';
import { CreateJournalPageDto } from '../dto/create-journal-page.dto';
import { UpdateJournalPageDto } from '../dto/update-journal-page.dto';
import { JournalPage } from '../entities/journal-page.entity';
import { User } from 'src/common/decorator/user.decorator';
import { LocalAuthGuard } from 'src/guard/auth.guard';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';

@UseGuards(LocalAuthGuard)
@Controller('user/journal/page')
export class JournalPageController {
  constructor(private readonly journalPageService: JournalPageService) {}


  @Get("/all")
  async findPagesByJournalId(
    @User("userId",ParseIntPipe) userId:number,
    @Query('journalId',ParseIntPipe) journalId:number

  ):Promise<JournalPage[]>
  {
    console.log(userId,journalId,typeof userId,typeof journalId)
    return this.journalPageService.findPagesByJournalId(userId,journalId);
  }
  
  @Post("/add-page")
  @UsePipes(new ValidateDtoPipe(CreateJournalPageDto))
  async create(
    @User("userId",ParseIntPipe) userId:number,
    @Query('journalId',ParseIntPipe) journalId:number,
    @Body() createJournalPageDto: CreateJournalPageDto
  ):Promise<JournalPage>
  {
    return this.journalPageService.createPage(userId,journalId,createJournalPageDto)
  }

  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journalPageService.findOne(+id);
  } */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJournalPageDto: UpdateJournalPageDto) {
    return this.journalPageService.update(+id, updateJournalPageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journalPageService.remove(+id);
  }
}
