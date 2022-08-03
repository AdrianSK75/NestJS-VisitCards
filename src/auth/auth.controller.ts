import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async Register(
    @Body()
    userData: { email: string; name?: string; password: string },
    @Res() res,
    @Req() req,
  ): Promise<UserModel> {
    return await this.authService.Register(userData, res, req);
  }
  @Get('/login')
  async Login(
    @Body() userData: { email: string; password: string },
    @Res() res,
    @Req() req,
  ): Promise<UserModel> {
    return await this.authService.Login(userData, res, req);
  }
}
