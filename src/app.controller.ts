import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GroupApiResponses } from './common/decorator/api-response.decorator';
import { APIResponse } from './common/interfaces/api-response.interface';

@ApiTags("Default / app")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get a hello message.' })
  @GroupApiResponses(String)
  getHello(): APIResponse<string> 
  {
    const APIResponse:APIResponse<string> = {
      statusCode: HttpStatus.OK,
      data: this.appService.getHello()
      }
    return APIResponse;
  }

  @Get("/health")
  @ApiOperation({ summary: 'Get the health status of the application.' }) // Descrizione dell'endpoint
  @GroupApiResponses(String)
  getHealth():APIResponse<string>
  {
    const APIResponse:APIResponse<string> = {
      statusCode: HttpStatus.OK,
      data: this.appService.getHealth()
    }
    return APIResponse;
  }
}
