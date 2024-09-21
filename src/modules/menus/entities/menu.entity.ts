import {
  DatabaseEntity,
  DatabaseProp,
  DatabaseSchema,
} from '@common/database/decorators/database.decorator';
import { DatabaseEntityAbstract } from '@common/database/abstracts/db.entity.abstract';
import { IDatabaseDocument } from '@common/database/interfaces/database.interface';

@DatabaseEntity({ collection: 'menu' })
export class MenuEntity extends DatabaseEntityAbstract {
  @DatabaseProp({
    required: false,
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
  description?: string;

  @DatabaseProp({
    required: false,
  })
  price?: number;
}

export const MenuSchema = DatabaseSchema(MenuEntity);
export type MenuDoc = IDatabaseDocument<MenuEntity>;
