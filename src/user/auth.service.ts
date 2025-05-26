import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserFiz,
  CreateUserYur,
  LoginUserDto,
  ResetPasswordDto,
  VerifyUserDto,
} from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { totp } from 'otplib';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { UpdateUserFiz } from './dto/update-user.dto';

totp.options = {
  digits: 6,
  step: 300,
  window: 1,
}

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailer: NodemailerService,
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
      try {
        this.mailer.send(dataInput.email, totp.generate(dataInput.email), "Xisobingizni tasdiqlash uchun kodingiz", "Verify your account",);
      } catch (error) {
        console.log(error);
        return error.message;
      }
      return user;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async sendOtp(email: string) { 
    try {
      let user = await this.prisma.user.findFirst({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const otp = totp.generate(email);
      this.mailer.send(email, otp, 'Sizning OTP kodingiz', 'OTP Code');
      return { message: 'OTP sent successfully' };
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async verify(data: VerifyUserDto) {
    try {
      let match = totp.check(data.otp, data.email);
      if (!match) {
        throw new BadRequestException('Invalid OTP code');
      }
      let user = await this.prisma.user.findFirst({
        where: { email: data.email },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true },
      });
      return { message: 'User verified successfully', user };
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
        email: createUserDto.email,
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
        data: {
          ...UserDetails,
          password: hash,
          role: UserRole.USER_YUR,
          telegramUserName: createUserDto.telegramUserName,
        },
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

  async toAdmin(id: string) {
    try {
      let users = await this.prisma.user.findFirst({ where: { id } });
      if (!users) { 
        throw new NotFoundException('User not found');
      }
      if (users.role === UserRole.ADMIN) {
        throw new BadRequestException('User is already an admin');
      }
      users = await this.prisma.user.update({
        where: { id },
        data: { role: UserRole.ADMIN },
      });
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
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async me(id: string) {
    try {
      let myProfile = await this.prisma.user.findFirst({
        where: { id },
        include: {
          companys: true,
          region: true,
        },
      });
      return myProfile;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async resetPass(id: string, data: ResetPasswordDto) {
    try {
      let user = await this.prisma.user.findFirst({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!user.email) {
        throw new BadRequestException('User email not found');
      }
      this.mailer.send(
        user.email,
        totp.generate(user.email),
        'Sizning parolni tiklash uchun kodingiz',
        'Reset password',
      );
      let match = totp.check(data.otp, user.email);
      if (!match) {
        throw new BadRequestException('Invalid OTP code');
      }
      let hash = bcrypt.hashSync(data.newpassword, 10);
      await this.prisma.user.update({
        where: { id },
        data: { password: hash },
      });
      return { message: 'Password reset successfully' };
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async updateUser(id: string, data: UpdateUserFiz) { 
    try {
      let user = await this.prisma.user.findFirst({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (data.password) {
        data.password = bcrypt.hashSync(data.password, 10);
      }
      user = await this.prisma.user.update({
        where: { id },
        data,
      });
      return user;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }


}
