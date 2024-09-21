import { faker } from '@faker-js/faker';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserIdHideDto } from '@common/dtos/common-hide.dto';

export class MenuDto extends CreateUserIdHideDto {
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
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  price?: number;
}
