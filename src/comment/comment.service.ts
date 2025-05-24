import { Inject, Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CommentService {

  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      const master = this.prisma.master.findFirst({ where: { id: createCommentDto.masterId } })
      if(!master) {
        throw new NotFoundException('Master not found');
      }
      const comment = await this.prisma.comment.create({
        data: {
          message: createCommentDto.message,
          star: createCommentDto.star,
          masterId: createCommentDto.masterId,
        },
        
      });
      return comment;
    } catch (error) {
      console.log(error);
      return error.message
    }
  }

  async findAll(options) {
    try {
      let sort = options.sort
      let order = options.order
      let take = options.take || 10
      let from = options.from || 0
      let where: {} = {}
      if (options.search) {
        where = {
          OR: [
            { message: { contains: options.search } },
            { star: { contains: options.search } },
          ],
        }
      }
      if (options.masterId) {
        where = {
          ...where,
          masterId: options.masterId
        }
      }
      if (options.star) {
        where = {
          ...where,
          star: options.star
        }
      }

      let comments = await this.prisma.comment.findMany({
        where,
        orderBy: { [sort]: order },
        take: Number(take),
        skip: Number(from),
      })
      return comments;
    } catch (error) {
      console.log(error);
      return error.message
    }
  }

  async findOne(id: string) {
    try {
      let one = await this.prisma.comment.findFirst({ where: { id } })
      if (!one) {
        throw new NotFoundException("COmment not found")
      }
      return one
    } catch (error) {
      console.log(error);
      return error.message      
    }
  }

  async update(id: string, data: UpdateCommentDto) {
    try {
      let one = await this.prisma.comment.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('COmment not found');
      }
      let updated = await this.prisma.comment.update({ where: { id }, data })
      return updated;
    } catch (error) {
      console.log(error);
      return error.message
    }
  }

  async remove(id: string) {
    try {
      let one = await this.prisma.comment.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('COmment not found');
      }
      let deleted = await this.prisma.comment.delete({ where: { id } })
      return deleted;
    } catch (error) {
      console.log(error);
      return error.message

    }
  }
}
