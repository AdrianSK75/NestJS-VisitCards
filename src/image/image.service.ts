import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { Image } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService, private users: UsersService) {}

  async uploadImage(
    id: number,
    file: Express.Multer.File,
    res: any,
  ): Promise<Image> {
    const roles = await this.users.getRoles(id);
    const findRole = roles.filter((role) => role.id === 2 || role.id === 3);
    if (findRole.length !== 0) {
      return this.prisma.image.create({
        data: {
          image: file.originalname,
          user: {
            connect: { id: id },
          },
        },
      });
    }
    return res
      .status(403)
      .json('You do not have permission to upload an image!');
  }
}
