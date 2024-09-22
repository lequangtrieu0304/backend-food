import {
  DatabaseEntity,
  DatabaseProp,
  DatabaseSchema,
} from '@common/database/decorators/database.decorator';
import { DatabaseEntityAbstract } from '@common/database/abstracts/db.entity.abstract';
import { IDatabaseDocument } from '@common/database/interfaces/database.interface';
import { RestaurantEntity } from '@modules/restaurants/entities/restaurant.entity';
import {
  CartItems,
  DeliveryDetails,
} from '@modules/orders/interfaces/order.interface';
import { EnumStatus } from '@modules/orders/enums/order.enum';

@DatabaseEntity({ collection: 'order' })
export class OrderEntity extends DatabaseEntityAbstract {
  @DatabaseProp({
    required: true,
    type: String,
    ref: RestaurantEntity.name,
  })
  restaurant: string;

  @DatabaseProp({
    type: Object,
    required: false,
  })
  deliveryDetails?: DeliveryDetails;

  @DatabaseProp({
    type: Array,
    required: false,
  })
  cartItems?: CartItems[];

  @DatabaseProp({
    type: Number,
    required: true,
  })
  totalAmount: number;

  @DatabaseProp({
    enum: EnumStatus,
    default: EnumStatus.PENDING,
  })
  status?: EnumStatus;
}

export const OrderSchema = DatabaseSchema(OrderEntity);
export type OrderDoc = IDatabaseDocument<OrderEntity>;
