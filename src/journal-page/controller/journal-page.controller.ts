import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards, UsePipes, Put } from '@nestjs/common';
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

  @Get("/:id")
  async findPageById(
    @User("userId",ParseIntPipe) userId:number,
    @Query('journalId',ParseIntPipe) journalId:number,
    @Param("id",ParseIntPipe) pageId:number
  ):Promise<JournalPage>
  {
    return this.journalPageService.findPageById(userId,journalId,pageId);
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

  @Put('/update/:id')
  @UsePipes(new ValidateDtoPipe(UpdateJournalPageDto))
  updatePageById(
    @User("userId",ParseIntPipe) userId:number,
    @Query('journalId',ParseIntPipe) journalId:number,
    @Param("id",ParseIntPipe) pageId:number,
    @Body() updateJournalPageDto: UpdateJournalPageDto
  ):Promise<JournalPage> 
  {
    return this.journalPageService.updatePageById(userId,journalId,pageId,updateJournalPageDto)
  }

  @Delete('/remove/:id')
  async deletePageById(
    @User("userId",ParseIntPipe) userId:number,
    @Query('journalId',ParseIntPipe) journalId:number,
    @Param("id",ParseIntPipe) pageId:number,
  ) {
    return this.journalPageService.deletePageById(userId,journalId,pageId);
  }
}
