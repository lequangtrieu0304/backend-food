import { faker } from '@faker-js/faker';
import { ApiHideProperty, ApiProperty, PickType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  isArray,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserIdHideDto } from '@common/dtos/common-hide.dto';
import { TransformInt } from '@common/validator.transformer';
import mongoose, { Types } from 'mongoose';

export class RestaurantDto extends CreateUserIdHideDto {
  @ApiProperty({
    example: faker.person.fullName(),
    required: true,
    maxLength: 100,
    minLength: 1,
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  @Type(() => String)
  name?: string;

  @ApiProperty({ type: 'file', format: 'binary' })
  @IsOptional()
  image?: string;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    example: faker.location.streetAddress(),
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: faker.location.city(),
    required: false,
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    example: faker.location.country(),
    required: false,
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    example: faker.number.int({ max: 30 }),
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @TransformInt()
  deliveryTime?: number;

  @ApiProperty({
    example: [faker.string.binary()],
    required: false,
    isArray: true,
  })
  @IsArray()
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => (!isArray(value) ? [value] : value))
  cuisines?: string[];

  @ApiProperty({
    example: [faker.string.binary()],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => (!isArray(value) ? [value] : value))
  menus?: string[];
}

export class FilterRestaurantDto extends PickType(RestaurantDto, [
  'name',
  'country',
  'city',
  'deliveryTime',
  'address',
  'cuisines',
]) {
  @ApiProperty({
    example: faker.person.fullName(),
    required: false,
    maxLength: 100,
    minLength: 1,
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  @Type(() => String)
  name?: string;

  @ApiProperty({
    example: [faker.string.binary()],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => (!isArray(value) ? [value] : value))
  cuisines?: string[];
}
