import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import {
  ApiCreateOperation,
  ApiTagsAndBearer,
} from '@common/swagger/swagger.decorator';
import { AddCreatedByIdToBody } from '@common/decorators/add-user-to-request.decorator';
import { OrderService } from '@modules/orders/services/order.service';
import {
  CheckoutSessionRequestDto,
  OrderDto,
} from '@modules/orders/dtos/order.dto';
import { OrderEntity } from '@modules/orders/entities/order.entity';
import { SkipAuth } from '@common/auth/jwts/jwt.decorator';

@ApiTagsAndBearer('Order')
@ApiExtraModels()
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiCreateOperation()
  @Post()
  async create(
    @AddCreatedByIdToBody()
    @Body()
    body: OrderDto,
  ): Promise<OrderEntity> {
    return this.orderService.create<OrderEntity>(body);
  }

  @ApiCreateOperation()
  @Post('/create-checkout-session')
  async createCheckoutSession(
    @AddCreatedByIdToBody()
    @Body()
    checkoutSessionRequest: CheckoutSessionRequestDto,
  ) {
    return this.orderService.createCheckoutSession(checkoutSessionRequest);
  }

  @Post('/stripe-webhook')
  @SkipAuth()
  async stripeWebhook(@Req() req: Request) {
    return this.orderService.stripeWebhook(req);
  }
}
