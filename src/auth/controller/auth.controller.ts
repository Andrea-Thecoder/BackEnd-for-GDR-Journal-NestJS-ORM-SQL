import { Body, Controller, HttpStatus, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Users } from 'src/users/entities/users.entity';
import { LoginDto } from '../dto/login.dto';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { SanitizeHtmlPipe } from 'src/common/pipes/sanificate-html.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GroupApiResponses } from 'src/common/decorator/api-response.decorator';
import { LoginResponse } from '../dto/login-response.dto';
import { APIResponse } from 'src/common/interfaces/api-response.interface';

@ApiTags("Auth")
@Controller('user/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/login')
  @UsePipes(new SanitizeHtmlPipe, new ValidateDtoPipe(LoginDto))
  @ApiOperation({ summary: 'Login a user and return an access token.' })
  @GroupApiResponses(LoginResponse)
  async login(@Body() body: LoginDto):Promise<APIResponse<LoginResponse>> 
  {

    const APIResponse:APIResponse<LoginResponse> = {
      statusCode: HttpStatus.OK,
      data: await this.authService.login(body)
    }
    return APIResponse;
  }
}
