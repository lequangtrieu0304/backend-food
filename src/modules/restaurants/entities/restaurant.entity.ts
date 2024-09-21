import {
  DatabaseEntity,
  DatabaseProp,
  DatabaseSchema,
} from '@common/database/decorators/database.decorator';
import { DatabaseEntityAbstract } from '@common/database/abstracts/db.entity.abstract';
import { IDatabaseDocument } from '@common/database/interfaces/database.interface';
import { MenuEntity } from '@modules/menus/entities/menu.entity';

@DatabaseEntity({ collection: 'restaurant' })
export class RestaurantEntity extends DatabaseEntityAbstract {
  @DatabaseProp({
    required: false,
    index: true,
    trim: true,
    type: String,
    maxlength: 100,
  })
  name?: string;

  @DatabaseProp({
    required: false,
    type: String,
    trim: true,
  })
  imageUrl?: string;

  @DatabaseProp({
    required: false,
    maxlength: 200,
    trim: true,
  })
  address?: string;

  @DatabaseProp({
    required: false,
    maxlength: 50,
    trim: true,
  })
  city?: string;

  @DatabaseProp({
    required: false,
    type: String,
    trim: true,
  })
  country?: string;

  @DatabaseProp({ required: false })
  deliveryTime?: number;

  @DatabaseProp({
    required: false,
    type: Array,
  })
  cuisines?: string[];

  @DatabaseProp({
    type: [{ type: String, ref: MenuEntity.name }],
    default: [],
  })
  menus?: string[];
}

export const RestaurantSchema = DatabaseSchema(RestaurantEntity);
export type RestaurantDoc = IDatabaseDocument<RestaurantEntity>;
