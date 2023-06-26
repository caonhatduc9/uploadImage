import { PartialType } from '@nestjs/mapped-types';
import { CreateImgurDto } from './create-imgur.dto';

export class UpdateImgurDto extends PartialType(CreateImgurDto) {}
