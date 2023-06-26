import { Module } from '@nestjs/common';
import { ImgurService } from './imgur.service';
import { ImgurController } from './imgur.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ImgurProviders } from './providers/imgur.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ImgurController],
  providers: [ImgurService, ...ImgurProviders]
})
export class ImgurModule {}
