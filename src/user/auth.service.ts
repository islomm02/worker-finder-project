import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserFiz,
  CreateUserYur,
  LoginUserDto,
} from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async registerFiz(dataInput: CreateUserFiz) {
    try {
      console.log(dataInput);

      let user = await this.prisma.user.findFirst({
        where: { phone: dataInput.phone },
      });
      if (user) {
        throw new BadRequestException('User with this phone already exists');
      }
      let hash = bcrypt.hashSync(dataInput.password, 10);
      user = await this.prisma.user.create({
        data: {
          ...dataInput,
          role: UserRole.USER_FIZ,
          password: hash,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async registerYur(createUserDto: CreateUserYur) {
    try {
      const UserDetails = {
        fullName: createUserDto.fullName,
        phone: createUserDto.phone,
        password: createUserDto.password,
        regionId: createUserDto.regionId,
      };
      const CompanyDetails = {
        inn: createUserDto.inn,
        mfo: createUserDto.mfo,
        pc: createUserDto.pc,
        Oked: createUserDto.oked,
        bank: createUserDto.bank,
        adress: createUserDto.adress,
      };
      let user = await this.prisma.user.findFirst({
        where: { phone: createUserDto.phone },
      });
      if (user) {
        throw new BadRequestException('User with this phone already exists');
      }
      let hash = bcrypt.hashSync(createUserDto.password, 10);
      user = await this.prisma.user.create({
        data: { ...UserDetails, password: hash, role: UserRole.USER_YUR, telegramUserName: createUserDto.telegramUserName },
      });
      await this.prisma.aboutCompany.create({
        data: { ...CompanyDetails, userId: user.id },
      });
      let newUser = await this.prisma.user.findFirst({
        where: { id: user.id },
        include: { companys: true },
      });
      return newUser;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findAll() {
    try {
      let users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async login(createUserDto: LoginUserDto) {
    try {
      let user = await this.prisma.user.findFirst({
        where: { phone: createUserDto.phone },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const accessToken = this.jwt.sign(
        { id: user.id, role: user.role },
        { expiresIn: '15m' },
      );

      const refreshToken = this.jwt.sign(
        { id: user.id, role: user.role },
        { expiresIn: '7d' },
      );
      return{ accessToken, refreshToken}
    } catch (error) {
      console.log(error);
      return error.message
    }
  }


  async me(id: string) { 
    try {
      let myProfile = await this.prisma.user.findFirst({
        where: { id }, include: {
          companys: true,
          region: true,          
        }
      }) 
      return myProfile
    } catch (error) {
      console.log(error);
      return error.message
    }
  }
}
