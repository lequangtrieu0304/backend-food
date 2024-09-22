import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ValidatorExistType } from '@common/enum-common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantEntity } from '@modules/restaurants/entities/restaurant.entity';
import { ClsService } from 'nestjs-cls';
import { RestaurantClsStore } from '@modules/restaurants/cls-stores/restaurant.cls';

interface MyValidationArguments extends ValidationArguments {
  constraints: [ValidatorExistType];
}

@Injectable()
@ValidatorConstraint({ name: 'RestaurantNotExistValidator' })
export class RestaurantNotExistValidator
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectModel(RestaurantEntity.name)
    private readonly restaurantModel: Model<RestaurantEntity>,
    private readonly cls: ClsService<RestaurantClsStore>,
  ) {}

  async validate(value: string, args: MyValidationArguments) {
    const restaurant = await this.restaurantModel.findOne({ _id: value });
    if (!restaurant) {
      this.defaultMessage(args);
      return false;
    }
    this.cls.set('restaurant', restaurant);
    return true;
  }

  defaultMessage(args?: MyValidationArguments) {
    return 'RESTAURANT' + args.constraints[0];
  }
}
