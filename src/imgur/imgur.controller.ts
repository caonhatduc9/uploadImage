import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ImgurService } from './imgur.service';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('imgur')
export class ImgurController {
  constructor(private readonly imgurService: ImgurService) { }

  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 20 },
  ],
    {
      storage: diskStorage({
        destination: path.join(__dirname, '../../uploads'),
        filename: (req, file, cb) => {
          // Define the filename logic here
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalname = file.originalname;
          const filename = `${uniqueSuffix}-${originalname}`;
          cb(null, filename);
        },
      }),
    }
  ))
  async uploadImage(@UploadedFiles() files: { image?: Express.Multer.File[] }, @Body() body: any) {
    if (!files) {
      return {
        status: 404,
        message: 'No file uploaded',
      }
    }
    return await this.imgurService.uploadImage(files);
  }
  @Get()
  async getListImage() {
    return await this.imgurService.getListImage();
  }
}
