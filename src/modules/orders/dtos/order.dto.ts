import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { CreateUserIdHideDto } from '@common/dtos/common-hide.dto';
import {
  CartItems,
  DeliveryDetails,
} from '@modules/orders/interfaces/order.interface';
import { EnumStatus } from '@modules/orders/enums/order.enum';
import { RestaurantNotExistValidator } from '@modules/restaurants/validators/restaurant-not-exist.validator';
import { ValidatorExistType } from '@common/enum-common';

export class OrderDto extends CreateUserIdHideDto {
  @ApiProperty({
    example: faker.person.fullName(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  restaurant: string;

  @ApiProperty({
    required: false,
    example: {
      email: 'lequangtrieu0304@gmail.com',
      name: 'le quang trieu',
      address: 'Ha Dong, Ha Noi',
      city: 'Ha Noi, Viet Nam',
    },
  })
  @IsOptional()
  deliveryDetails?: DeliveryDetails;

  @ApiProperty({
    required: false,
    example: [
      {
        name: 'Banh ngot',
        image: 'https://imageUrl',
        price: 150,
        quantity: 5,
      },
    ],
  })
  @IsArray()
  @IsOptional()
  cartItems?: CartItems[];

  @ApiProperty({
    required: true,
    example: 150,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({
    required: true,
    example: EnumStatus.PENDING,
  })
  @IsEnum(EnumStatus)
  @IsOptional()
  status?: EnumStatus;
}

export class CheckoutSessionRequestDto extends CreateUserIdHideDto {
  @ApiProperty({
    example: faker.person.fullName(),
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Validate(RestaurantNotExistValidator, [ValidatorExistType.NOT_EXIST])
  restaurant: string;

  @ApiProperty({
    required: false,
    example: {
      email: 'lequangtrieu0304@gmail.com',
      name: 'le quang trieu',
      address: 'Ha Dong, Ha Noi',
      city: 'Ha Noi, Viet Nam',
    },
  })
  @IsOptional()
  deliveryDetails?: DeliveryDetails;

  @ApiProperty({
    required: false,
    example: [
      {
        name: 'Banh ngot',
        image: 'https://imageUrl',
        price: 150,
        quantity: 5,
      },
    ],
  })
  @IsArray()
  @IsOptional()
  cartItems?: CartItems[];

  @ApiProperty({
    required: true,
    example: EnumStatus.PENDING,
  })
  @IsEnum(EnumStatus)
  @IsOptional()
  status?: EnumStatus;
}
