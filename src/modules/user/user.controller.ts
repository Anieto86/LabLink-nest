import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {  }

  @Get('info')
  async getUserInfo(@Query('id') id: number) {
    return this.userService.getUserInfo(id);
  }

  @Get('by-email')
  async getUserByEmail(@Query('email') email: string) {
    return this.userService.getUserByEmail(email);
  }
}
