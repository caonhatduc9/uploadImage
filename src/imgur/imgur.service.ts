import { HttpServer, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/entities/asset.entity';
import { Repository } from 'typeorm';
import { ImgurClient } from 'imgur';
import { createReadStream } from 'fs';


@Injectable()
export class ImgurService {
  constructor(
    // private readonly httpService: HttpServer,
    private readonly configService: ConfigService,
    @Inject('ASSET_REPOSITORY')
    private readonly assetRepository: Repository<Asset>,
  ) { }

  async uploadImage(file: any) {
    const image = file.image[0];
    const asset = new Asset();
    // asset.name = listImage[i].filename;
    asset.type = "IMAGE";
    asset.name = image.originalname;
    console.log("PROTOCAL: ", this.configService.get('PROTOCOL'));
    console.log("HOST: ", this.configService.get('HOST'));
    console.log("FOLDER: ", this.configService.get('FOLDER'));
    // asset.url = this.configService.get('PROTOCOL') + "://" + this.configService.get('HOST') + "/" + this.configService.get('FOLDER') + "/" + image.filename;
    asset.url = "http://upload.chuyenhaidua.id.vn/uploads" + "/" + image.filename;

    await this.assetRepository.save(asset);
    return {
      statusCode: 200,
      message: "Upload image successfully",
    }
    // Setting
    // const client = new ImgurClient({ clientId: this.configService.get('CLIENT_ID')});

    // const response = await client.upload({
    //   image: createReadStream(file.path),
    //   type: 'stream',
    // });
    // console.log(response.data);
    // const newImage = new Image();
    // newImage.url = file.path;
    // newImage.imgurLink = link;
    // newImage.fileName = file.originalname;
    // // Set additional fields if needed

    // await this.imageRepository.save(newImage);

    // // Delete the file after saving to the database
    // // fs.unlink(file.path, (err) => { });

    // return {
    //   imgurLink: link,
    //   deletehash: deletehash,
    // };
  }
  async getListImage() {
    const listImage = await this.assetRepository.find();
    return {
      statusCode: 200,
      message: "Get list image successfully",
      data: listImage,
    }
  }
}
