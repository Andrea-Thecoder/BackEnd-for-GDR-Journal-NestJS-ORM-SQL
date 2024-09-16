import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards, UsePipes, Put, HttpStatus } from '@nestjs/common';
import { JournalPageService } from '../service/journal-page.service';
import { CreateJournalPageDto } from '../dto/create-journal-page.dto';
import { UpdateJournalPageDto } from '../dto/update-journal-page.dto';
import { JournalPage } from '../entities/journal-page.entity';
import { User } from 'src/common/decorator/user.decorator';
import { LocalAuthGuard } from 'src/guard/auth.guard';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { SanitizeHtmlPipe } from 'src/common/pipes/sanificate-html.pipe';
import { APIResponse } from 'src/common/interfaces/api-response.interface';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GroupApiResponses } from 'src/common/decorator/api-response.decorator';

@ApiTags("Journal Page")
@UseGuards(LocalAuthGuard)
@ApiBearerAuth()
@Controller('user/journal/page')
export class JournalPageController {
  constructor(private readonly journalPageService: JournalPageService) {}


  @Get("/all")
  @ApiOperation({
    summary: 'Retrieve all journal pages for a specific journal of the user.',
    description: 'Fetches all journal pages for a journal specified by the journalId query parameter. The userId is extracted automatically from the JWT and does not need to be provided manually.'
  })
  @ApiQuery({
    name: 'journalId',
    type: Number,
    description: 'The ID of the journal to fetch pages from.',
  })
  @GroupApiResponses(CreateJournalPageDto)
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
  @ApiOperation({
    summary: 'Retrieve the journal page with specific ID  for a specific journal of the user.',
    description: 'Fetches the journal page with specific ID for a journal specified by the journalId query parameter. The userId is extracted automatically from the JWT and does not need to be provided manually.'
  })
  @ApiQuery({
    name: 'journalId',
    type: Number,
    description: 'The ID of the journal to fetch pages from.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the journal page to retrieve.',
  })
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
  @ApiOperation({
    summary: 'Create a new journal page for the user.',
    description: 'Creates a new journal page for a specific journal identified by the journalId query parameter. The userId is extracted automatically from the JWT and does not need to be provided manually.'
  })
  @ApiQuery({
    name: 'journalId',
    type: Number,
    description: 'The ID of the journal where the page will be added.',
  })
  @ApiBody({
    type: CreateJournalPageDto,
    description: 'The data required to create a new journal page.',
  })
  @GroupApiResponses(CreateJournalPageDto) 
  async createPage(
    @User("userId",ParseIntPipe) userId:number,
    @Query('journalId',ParseIntPipe) journalId:number,
    @Body() createJournalPageDto: CreateJournalPageDto
  ):Promise<APIResponse<JournalPage>>
  {
    const APIResponse:APIResponse<JournalPage> = {
      statusCode: HttpStatus.OK,
      data: await this.journalPageService.createPage(userId,journalId,createJournalPageDto)
    }
    return APIResponse
  }

  @Put('/update/:id')
  @UsePipes(new SanitizeHtmlPipe(),new ValidateDtoPipe(UpdateJournalPageDto))
  @ApiOperation({
    summary: 'Update an existing journal page for the user.',
    description: 'Updates an existing journal page identified by the pageId parameter for a specific journal identified by the journalId query parameter. The userId is extracted automatically from the JWT and does not need to be provided manually.'
  })
  @ApiQuery({
    name: 'journalId',
    type: Number,
    description: 'The ID of the journal where the page will be updated.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the journal page to update.',
  })
  @ApiBody({
    type: UpdateJournalPageDto,
    description: 'The data required to update the journal page.',
  })
  @GroupApiResponses(CreateJournalPageDto)
  async updatePageById(
    @User("userId",ParseIntPipe) userId:number,
    @Query('journalId',ParseIntPipe) journalId:number,
    @Param("id",ParseIntPipe) pageId:number,
    @Body() updateJournalPageDto: UpdateJournalPageDto
  ):Promise<APIResponse<JournalPage>>
  {
    const APIResponse:APIResponse<JournalPage> = {
      statusCode: HttpStatus.OK,
      data: await this.journalPageService.updatePageById(userId,journalId,pageId,updateJournalPageDto)
    }
    return APIResponse;
  }

  @Delete('/remove/:id')
  @ApiOperation({
    summary: 'Delete a journal page by ID.',
    description: 'Deletes a specific journal page identified by the pageId parameter for a journal specified by the journalId query parameter. The userId is extracted automatically from the JWT and does not need to be provided manually.'
  })
  @ApiQuery({
    name: 'journalId',
    type: Number,
    description: 'The ID of the journal from which the page will be deleted.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the journal page to delete.',
  })
  @GroupApiResponses(CreateJournalPageDto)
  async deletePageById(
    @User("userId",ParseIntPipe) userId:number,
    @Query('journalId',ParseIntPipe) journalId:number,
    @Param("id",ParseIntPipe) pageId:number,
  ):Promise<APIResponse<JournalPage>>
  {
    const APIResponse:APIResponse<JournalPage> = {
      statusCode: HttpStatus.OK,
      data: await this.journalPageService.deletePageById(userId,journalId,pageId)
    }
    return APIResponse
  }
}
