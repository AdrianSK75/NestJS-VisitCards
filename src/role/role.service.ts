import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Role[]> {
    return await this.prisma.role.findMany();
  }

  async createRole(data: Prisma.RoleCreateInput): Promise<Role> {
    const { title, description } = data;
    return await this.prisma.role.create({
      data: {
        title: title,
        description: description,
      },
    });
  }

  update(id: number) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
