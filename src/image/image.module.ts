import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService, PrismaService, UsersService],
})
export class ImageModule {}
