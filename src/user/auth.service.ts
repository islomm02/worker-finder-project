import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateUserFiz,
  CreateUserYur,
  LoginUserDto,
} from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
    user = await this.prisma.user.create({ data: {...UserDetails, password: hash} })
    await this.prisma.aboutCompany.create({ data: { ...CompanyDetails, userId: user.id } })
    let newUser = await this.prisma.user.findFirst({where: {id: user.id}, include: {companys: true}})
    return newUser
  }

  findAll() {
    return `This action returns all user`;
  }

  login(createUserDto: LoginUserDto) {
    return 'This action adds a new user';
  }
}
