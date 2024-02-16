import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from '../service';
import { AuthService } from '../auth';
import { LocalAuthGuard, JwtAuthGuard } from '../guards';
import { CustomLogger } from '../modules/logger';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext('AppController');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
