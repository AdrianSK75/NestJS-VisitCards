import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { UsersModule } from './users/users.module';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';
import { RoleModule } from './role/role.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [UsersModule, RoleModule, ImageModule],
  controllers: [AuthController, RoleController],
  providers: [AuthService, PrismaService, RoleService],
})
export class AppModule {}
