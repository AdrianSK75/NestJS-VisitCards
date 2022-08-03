import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  User as UserModel,
  Role as RoleModel,
  Image as ImageModel,
} from '@prisma/client';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/findAll')
  findAll(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }

  @Get('/find/:id')
  findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.findOne(+id);
  }

  @Get(':id/roles')
  getRoles(@Param('id') id: string): Promise<RoleModel[]> {
    return this.usersService.getRoles(+id);
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() userData: { email: string; name: string; password: string },
    @Res() res,
    @Req() req,
  ): Promise<UserModel> {
    return this.usersService.update(+id, userData, res, req);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.remove(+id);
  }
}
