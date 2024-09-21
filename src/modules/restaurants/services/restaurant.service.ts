import { Injectable } from '@nestjs/common';
import { DatabaseRepositoryAbstract } from '@common/database/abstracts/db.repository.abstract';
import { DatabaseModel } from '@common/database/decorators/database.decorator';
import { Model, RootFilterQuery } from 'mongoose';
import {
  RestaurantDoc,
  RestaurantEntity,
} from '@modules/restaurants/entities/restaurant.entity';
import { FilterRestaurantDto } from '@modules/restaurants/dtos/restaurant.dto';
import { MenuEntity } from '@modules/menus/entities/menu.entity';

@Injectable()
export class RestaurantService extends DatabaseRepositoryAbstract<
  RestaurantEntity,
  RestaurantDoc
> {
  constructor(
    @DatabaseModel(RestaurantEntity.name)
    private readonly restaurantModel: Model<RestaurantEntity>,
  ) {
    super(restaurantModel);
  }

  async search(param: string, queryDto: FilterRestaurantDto) {
    const query: RootFilterQuery<RestaurantEntity> = {
      $and: [
        {
          $or: [
            { country: { $regex: param, $options: 'i' } },
            { name: { $regex: param, $options: 'i' } },
            { address: { $regex: param, $options: 'i' } },
          ],
        },
      ],
    };
    queryDto?.cuisines &&
      query.$and.push({ cuisines: { $in: queryDto.cuisines } });

    return this.restaurantModel.find(query);
  }

  async getOne(param: string) {
    return this.restaurantModel
      .findOne({ _id: param })
      .populate('menus')
      .exec();
  }
}
