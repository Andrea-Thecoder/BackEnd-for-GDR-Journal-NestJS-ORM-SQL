import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Users } from 'src/users/entities/users.entity';
import { LoginDto } from '../dto/login.dto';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';
import { SanitizeHtmlPipe } from 'src/common/pipes/sanificate-html.pipe';

@Controller('user/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/login')
  @UsePipes(new SanitizeHtmlPipe, new ValidateDtoPipe(LoginDto))
  async login(@Body() body: LoginDto):Promise<{
    access_token: string;}>  
  {
    return this.authService.login(body);
  }
}
