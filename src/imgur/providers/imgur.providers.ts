import { Asset } from "src/entities/asset.entity";
import { DataSource } from "typeorm";


export const ImgurProviders = [
    {
        provide: 'ASSET_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Asset),
        inject: ['DATA_SOURCE'],
    },

]