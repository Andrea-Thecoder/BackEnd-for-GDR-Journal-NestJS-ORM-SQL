import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards, UsePipes, Put, HttpStatus } from '@nestjs/common';
import { JournalPageService } from '../service/journal-page.service';
import { CreateJournalPageDto } from '../dto/create-journal-page.dto';
import { UpdateJournalPageDto } from '../dto/update-journal-page.dto';
import { JournalPage } from '../entities/journal-page.entity';
import { User } from 'src/common/decorator/user.decorator';
import { LocalAuthGuard } from 'src/guard/auth.guard';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { SanitizeHtmlPipe } from 'src/common/pipes/sanificate-html.pipe';
import { ApiResponse } from '@nestjs/swagger';
import { APIResponse } from 'src/common/interfaces/api-response.interface';

@UseGuards(LocalAuthGuard)
@Controller('user/journal/page')
export class JournalPageController {
  constructor(private readonly journalPageService: JournalPageService) {}


  @Get("/all")
  async findPagesByJournalId(
    @User("userId",ParseIntPipe) userId:number,
    @Query('journalId',ParseIntPipe) journalId:number

  ):Promise<APIResponse<JournalPage[]>>
  {
    const APIResponse:APIResponse<JournalPage[]> = {
      statusCode: HttpStatus.OK,
      data: await this.journalPageService.findPagesByJournalId(userId,journalId)
    }
    return APIResponse
    //return this.journalPageService.findPagesByJournalId(userId,journalId);
  }

  @Get("/:id")
  async findPageById(
    @User("userId",ParseIntPipe) userId:number,
    @Query('journalId',ParseIntPipe) journalId:number,
    @Param("id",ParseIntPipe) pageId:number
  ):Promise<APIResponse<JournalPage>>
  {
    const APIResponse:APIResponse<JournalPage> = {
      statusCode: HttpStatus.OK,
      data: await this.journalPageService.findPageById(userId,journalId,pageId)
    }
    return APIResponse
  }
  
  @Post("/add-page")
  //possiamo usare un sol odecorator per piu custom pipes. In questo caso l'ordine di attivazioen sarà da sinistra verso destra, ovvero l'ordine dichiarato. Invece se usassiamo piu decorator usepipe l'ordine sarà inverso ovvero verrà chiamata prima l'ultima scritta in ordine di riga e poi risale fino alla prima.
  @UsePipes(new SanitizeHtmlPipe(),new ValidateDtoPipe(CreateJournalPageDto))
  async createPage(
    @User("userId",ParseIntPipe) userId:number,
    @Query('journalId',ParseIntPipe) journalId:number,
    @Body() createJournalPageDto: CreateJournalPageDto
  ):Promise<JournalPage>
  {
    console.log("schigfo")
    return this.journalPageService.createPage(userId,journalId,createJournalPageDto)
  }

  @Put('/update/:id')
  @UsePipes(new SanitizeHtmlPipe(),new ValidateDtoPipe(UpdateJournalPageDto))
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
