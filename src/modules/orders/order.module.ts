import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from '@modules/orders/controllers/order.controller';
import { OrderService } from '@modules/orders/services/order.service';
import {
  OrderEntity,
  OrderSchema,
} from '@modules/orders/entities/order.entity';
import { RestaurantModule } from '@modules/restaurants/restaurant.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderEntity.name,
        schema: OrderSchema,
      },
    ]),
    RestaurantModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
