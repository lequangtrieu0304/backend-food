import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiExtraModels } from '@nestjs/swagger';
import {
  ApiCreateOperation,
  ApiListOperation,
  ApiPaginatedResponse,
  ApiRetrieveOperation,
  ApiTagsAndBearer,
} from '@common/swagger/swagger.decorator';
import {
  FilterRestaurantDto,
  RestaurantDto,
} from '@modules/restaurants/dtos/restaurant.dto';
import { RestaurantEntity } from '@modules/restaurants/entities/restaurant.entity';
import { RestaurantService } from '@modules/restaurants/services/restaurant.service';
import { AddCreatedByIdToBody } from '@common/decorators/add-user-to-request.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '@providers/cloudinary/cloudinary.service';
import { PaginatedResult } from '@common/api.schema';
import { SkipAuth } from '@common/auth/jwts/jwt.decorator';
import mongoose from 'mongoose';

@ApiTagsAndBearer('Restaurant')
@ApiExtraModels()
@Controller('restaurants')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @ApiRetrieveOperation()
  @Get(':id')
  @SkipAuth()
  async getOne(@Param('id') param: string): Promise<RestaurantEntity> {
    return this.restaurantService.getOne(param);
  }

  @ApiCreateOperation()
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @AddCreatedByIdToBody()
    @Body()
    body: RestaurantDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<RestaurantEntity> {
    const { url } = await this.cloudinaryService.uploadFile(image);

    return this.restaurantService.create<RestaurantEntity>({
      ...body,
      imageUrl: url,
    });
  }

  @ApiListOperation()
  @Get()
  @ApiPaginatedResponse(RestaurantEntity)
  async list(
    @Query() query: FilterRestaurantDto,
  ): Promise<PaginatedResult<RestaurantEntity>> {
    return this.restaurantService.findAll(query);
  }

  @ApiListOperation({ summary: 'Lọc restaurant theo điều kiện' })
  @Get('/search/:searchText')
  @SkipAuth()
  async search(
    @Param('searchText') param: string,
    @Query() query: FilterRestaurantDto,
  ) {
    return this.restaurantService.search(param, query);
  }
}
