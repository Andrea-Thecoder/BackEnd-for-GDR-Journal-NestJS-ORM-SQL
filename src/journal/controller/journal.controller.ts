import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, UseGuards, Put } from '@nestjs/common';
import { JournalService } from '../service/journal.service';
import { CreateJournalDto } from '../dto/create-journal.dto';
import { UpdateJournalDto } from '../dto/update-journal.dto';
import { Journal } from '../entities/journal.entity';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { LocalAuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/common/decorator/user.decorator';


@UseGuards(LocalAuthGuard)
@Controller('/user/journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get("/all")
  async findAllJournalByUserId(
    @User("userId",ParseIntPipe) userId:number
  ):Promise<Journal[]>
  {
    return this.journalService.findAllJournalByUserId(userId);
  }

  @Get('/:id')
  async findJournalById(
    @User("userId",ParseIntPipe) userId:number,
    @Param('id',ParseIntPipe) id: number
  ):Promise<Journal>
  {
    return this.journalService.findJournalById(id,userId);
  }
  
  @Post("/add-journal")
  @UsePipes(new ValidateDtoPipe(CreateJournalDto))
  async createJournal(
    @User("userId",ParseIntPipe) userId:number,
    @Body() createJournalDto: CreateJournalDto
  ):Promise<Journal>
  {
    return this.journalService.createJournal(userId,createJournalDto);
  }

  @Put('/update')
  @UsePipes(new ValidateDtoPipe(UpdateJournalDto))
  async update(
    @User("userId",ParseIntPipe) userId:number,
    @Param('id',ParseIntPipe) id: number,
    @Body() updateJournalDto: UpdateJournalDto
  ):Promise<Journal>
  {
    return this.journalService.updateJournalById(id, userId, updateJournalDto);
  }

  @Delete('/remove')
  async deleteJournal(
    @User("userId",ParseIntPipe) userId:number,
    @Param('id',ParseIntPipe) id: number
  ):Promise<Journal>
  {
    return this.journalService.deleteJournal(id,userId);
  }
}
