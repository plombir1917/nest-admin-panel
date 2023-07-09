import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { login, password }: AuthDto) {
    const { email } = await this.authService.validateAccount(login, password);
    return this.authService.login(email);
  }
}
