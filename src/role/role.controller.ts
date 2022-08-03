import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Prisma, Role as RoleModel } from '@prisma/client';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('findAll')
  findAll() {
    return this.roleService.findAll();
  }

  // @Get(':id/user')
  // async getUserRoles(@Param('id') id: number): Promise<RoleModel> {
  //   return await this.roleService.getUserRoles(id);
  // }

  @Post('create')
  createRole(@Body() roleData: Prisma.RoleCreateInput) {
    return this.roleService.createRole(roleData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
