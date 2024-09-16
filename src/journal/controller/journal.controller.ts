import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, UseGuards, Put, HttpStatus } from '@nestjs/common';
import { JournalService } from '../service/journal.service';
import { CreateJournalDto } from '../dto/create-journal.dto';
import { UpdateJournalDto } from '../dto/update-journal.dto';
import { Journal } from '../entities/journal.entity';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { LocalAuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/common/decorator/user.decorator';
import { SanitizeHtmlPipe } from 'src/common/pipes/sanificate-html.pipe';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GroupApiResponses } from 'src/common/decorator/api-response.decorator';
import { APIResponse } from 'src/common/interfaces/api-response.interface';

@ApiTags("User's Journal")
@UseGuards(LocalAuthGuard)
@ApiBearerAuth()
@Controller('/user/journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get("/all")
  @ApiOperation({
    summary: 'Get all journals for the user',
    description: 'Retrieve all journals for the authenticated user. The userId is automatically extracted from the JWT token.'
  })
  @GroupApiResponses(CreateJournalDto)
  async findAllJournalByUserId(
    @User("userId",ParseIntPipe) userId:number
  ):Promise<APIResponse<Journal[]>>
  {
    const APIResponse:APIResponse<Journal[]> = {
      statusCode: HttpStatus.OK,
      data: await this.journalService.findAllJournalByUserId(userId)
    }
    return APIResponse;
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get journal by journalId for the user',
    description: 'Retrieve journal by journalId for the authenticated user. The userId is automatically extracted from the JWT token.'
  })
  @ApiParam({name:"journalId",description: 'Journal ID', type: Number })
  @GroupApiResponses(CreateJournalDto)
  async findJournalById(
    @User("userId",ParseIntPipe) userId:number,
    @Param('journalId',ParseIntPipe) journalId: number
  ):Promise<APIResponse<Journal>>
  {
    const APIResponse:APIResponse<Journal> = {
      statusCode: HttpStatus.OK,
      data: await this.journalService.findJournalById(journalId,userId)
    }
    return APIResponse
  }
  
  @Post("/add-journal")
  @UsePipes(new SanitizeHtmlPipe(),new ValidateDtoPipe(CreateJournalDto))
  @ApiOperation({
    summary: 'Create new Journal for the user',
    description: 'Create journal by journalId for the authenticated user. The userId is automatically extracted from the JWT token.'
  })
  @GroupApiResponses(CreateJournalDto)
  async createJournal(
    @User("userId",ParseIntPipe) userId:number,
    @Body() createJournalDto: CreateJournalDto
  ):Promise<APIResponse<Journal>>
  {
    const APIResponse:APIResponse<Journal> = {
      statusCode: HttpStatus.OK,
      data: await this.journalService.createJournal(userId,createJournalDto)
    }
    return APIResponse;
  }

  @Put('/update')
  @UsePipes(new SanitizeHtmlPipe(),new ValidateDtoPipe(UpdateJournalDto))
  @ApiOperation({
    summary: 'Update journal by journalId for the user',
    description: 'Update journal by journalId for the authenticated user. The userId is automatically extracted from the JWT token.'
  })
  @ApiParam({name:"journalId",description: 'Journal ID', type: Number })
  @GroupApiResponses(CreateJournalDto)
  async update(
    @User("userId",ParseIntPipe) userId:number,
    @Param('journalId',ParseIntPipe) journalId: number,
    @Body() updateJournalDto: UpdateJournalDto
  ):Promise<APIResponse<Journal>>
  {
    const APIResponse:APIResponse<Journal> = {
      statusCode: HttpStatus.OK,
      data: await this.journalService.updateJournalById(journalId, userId, updateJournalDto)
    }
    return APIResponse;
  }

  @Delete('/remove')
  @ApiOperation({
    summary: 'Delete journal by journalId for the user',
    description: 'Delete journal by journalId for the authenticated user. The userId is automatically extracted from the JWT token.'
  })
  @ApiParam({name:"journalId",description: 'Journal ID', type: Number })
  @GroupApiResponses(CreateJournalDto)
  async deleteJournal(
    @User("userId",ParseIntPipe) userId:number,
    @Param('journalId',ParseIntPipe) journalId: number
  ):Promise<APIResponse<Journal>>
  {
    const APIResponse:APIResponse<Journal> = {
      statusCode: HttpStatus.OK,
      data: await this.journalService.deleteJournal(journalId,userId)
    }
    return APIResponse;
  }
}


