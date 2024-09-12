import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Users } from 'src/users/entities/users.entity';
import { LoginDto } from '../dto/login.dto';
import { ValidateDtoPipe } from 'src/common/pipes/validate-dto.pipe';

@Controller('user/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/login')
  @UsePipes(new ValidateDtoPipe(LoginDto))
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const user:Omit<Users,"password"> = await this.authService.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Se valido, genera e restituisci il token
    return this.authService.login(user);
  }
}
