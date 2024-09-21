import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiExtraModels } from '@nestjs/swagger';
import {
  ApiCreateOperation,
  ApiTagsAndBearer,
} from '@common/swagger/swagger.decorator';
import { AddCreatedByIdToBody } from '@common/decorators/add-user-to-request.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '@providers/cloudinary/cloudinary.service';
import { MenuService } from '@modules/menus/services/menu.service';
import { MenuDto } from '@modules/menus/dtos/menu.dto';
import { MenuEntity } from '@modules/menus/entities/menu.entity';

@ApiTagsAndBearer('Menu')
@ApiExtraModels()
@Controller('menus')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @ApiCreateOperation()
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @AddCreatedByIdToBody()
    @Body()
    body: MenuDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<MenuEntity> {
    const { url } = await this.cloudinaryService.uploadFile(image);
    return this.menuService.create<MenuEntity>({
      ...body,
      imageUrl: url,
    });
  }
}
