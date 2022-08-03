import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma, Role, Image } from '@prisma/client';
import { Express } from 'express';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async getRoles(id: number): Promise<Role[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: { roles: true },
    });
    const roles = user.roles.map((role) => role);
    return roles;
  }

  async update(
    id: number,
    data: Prisma.UserCreateInput,
    res,
    req,
  ): Promise<User> {
    const User = await this.findOne(id);
    const { email, name, password } = data;
    User.email = email;
    User.name = name;
    User.password = password;
    return res.status(200).json(User);
  }

  async remove(id: number): Promise<User> {
    return await this.prisma.user.delete({
      where: { id: id },
    });
  }
}
