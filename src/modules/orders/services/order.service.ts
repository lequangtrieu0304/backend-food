import { Injectable, Logger } from '@nestjs/common';
import { DatabaseRepositoryAbstract } from '@common/database/abstracts/db.repository.abstract';
import { DatabaseModel } from '@common/database/decorators/database.decorator';
import { Model } from 'mongoose';
import { OrderDoc, OrderEntity } from '@modules/orders/entities/order.entity';
import Stripe from 'stripe';
import { CheckoutSessionRequestDto } from '@modules/orders/dtos/order.dto';
import { BadRequest } from '@common/exceptions/exception.resolver';
import * as process from 'node:process';
import { EnumStatus } from '@modules/orders/enums/order.enum';

@Injectable()
export class OrderService extends DatabaseRepositoryAbstract<
  OrderEntity,
  OrderDoc
> {
  private readonly stripe: Stripe;

  constructor(
    @DatabaseModel(OrderEntity.name)
    private readonly orderModel: Model<OrderEntity>,
  ) {
    super(orderModel);
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createCheckoutSession(dto: CheckoutSessionRequestDto) {
    try {
      const totalAmount = dto.cartItems.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0,
      );
      const order = await this.orderModel.create({
        ...dto,
        totalAmount,
      });
      const lineItems = this.createLineItems(dto);

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['US', 'VN'],
        },
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}`,
        cancel_url: `${process.env.FRONTEND_URL}`,
        metadata: {
          orderId: order._id,
        },
      });

      if (!session.url)
        throw new BadRequest({
          message: 'Error while creating session payment',
        });
      return session;
    } catch (err) {
      Logger.error(err);
    }
  }

  private createLineItems(checkoutSessionRequest: CheckoutSessionRequestDto) {
    return checkoutSessionRequest.cartItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));
  }

  async stripeWebhook(req: Request) {
    let event: Stripe.Event;
    try {
      const signature = req.headers['stripe-signature'];
      const payloadString = JSON.stringify(req.body, null, 2);
      const header = this.stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: process.env.STRIPE_SECRET_KEY,
      });

      event = this.stripe.webhooks.constructEvent(
        payloadString,
        header,
        process.env.STRIPE_SECRET_KEY,
      );
    } catch (err) {
      Logger.error(err);
    }

    if (event.type === 'checkout.session.completed') {
      try {
        const session = event.data.object as Stripe.Checkout.Session;
        const order = await this.orderModel.findOne({
          _id: session.metadata?.orderId,
        });

        if (!order) throw new BadRequest({ message: 'Order not found' });

        await this.orderModel.updateOne(
          { _id: order._id },
          { status: EnumStatus.CONFIRMED },
        );
      } catch (err) {
        Logger.error(err);
      }
    }
  }
}
