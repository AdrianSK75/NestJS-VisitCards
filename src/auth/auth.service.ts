import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { RoleService } from '../role/role.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async findUser(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  async Register(data: Prisma.UserCreateInput, res, req): Promise<User> {
    const { email, name, password } = data;
    const User = await this.findUser(email);
    if (User) {
      return res.status(403).json({ message: 'The User already exists!' });
    }
    const newUser = await this.prisma.user.create({
      data: {
        email: email,
        name: name,
        password: password,
        roles: {
          connect: [{ id: 1 }],
        },
        profile: {
          create: {
            bio: 'This is my new profile!',
          },
        },
      },
      include: {
        profile: true,
        roles: true,
      },
    });
    return res.status(201).json(newUser);
  }
  async Login(data: Prisma.UserCreateInput, res, req): Promise<User> {
    const { email, password } = data;
    const User = await this.findUser(email);
    if (!User || password !== User.password) {
      return res.status(404).json({
        message: 'The user does not exist or the credentials are wrong!',
      });
    }
    return res.status(201).json(User);
  }
}
