import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RestaurantEntity,
  RestaurantSchema,
} from '@modules/restaurants/entities/restaurant.entity';
import { RestaurantController } from '@modules/restaurants/controllers/restaurant.controller';
import { RestaurantService } from '@modules/restaurants/services/restaurant.service';
import { CloudinaryModule } from '@providers/cloudinary/cloudinary.module';
import { MenuEntity, MenuSchema } from '@modules/menus/entities/menu.entity';
import { RestaurantNotExistValidator } from '@modules/restaurants/validators/restaurant-not-exist.validator';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RestaurantEntity.name,
        schema: RestaurantSchema,
      },
      {
        name: MenuEntity.name,
        schema: MenuSchema,
      },
    ]),
    CloudinaryModule,
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantNotExistValidator],
  exports: [RestaurantService, RestaurantNotExistValidator],
})
export class RestaurantModule {}
