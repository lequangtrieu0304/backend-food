import { ClsStore, Terminal } from 'nestjs-cls';
import { RestaurantEntity } from '@modules/restaurants/entities/restaurant.entity';

export interface RestaurantClsStore extends ClsStore {
  restaurant?: Terminal<RestaurantEntity>;
  restaurants?: Terminal<RestaurantEntity[]>;
}
