import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags, ApiParam } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import * as fs from 'fs';

@ApiTags('Fayl yuklash')
@Controller('multer')
export class MulterController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: `http://localhost:3000/uploads/${file.filename}`,
    };
  }

  @Get('uploads/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = `./uploads/${filename}`;
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath, { root: '.' });
    } else {
      res.status(404).json({ message: 'Rasm topilmadi' });
    }
  }
}
