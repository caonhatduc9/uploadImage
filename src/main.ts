import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(7100);


  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  // app.useStaticAssets(path.join(__dirname, '..', 'uploads'));
  // console.log(path.join(__dirname, '..', 'uploads'));
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:7100', 'http://chuyenhaidua.id.vn'], // add rontend url here
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  };
  app.enableCors(corsOptions);
  await app.listen(7100);

}
bootstrap();
