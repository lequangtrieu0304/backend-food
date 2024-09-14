import { faker } from '@faker-js/faker';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { EmailExistedValidator } from '@modules/users/validators/email-exited.validator';
import { ValidatorExistType } from '@common/enum-common';
import _ from 'lodash';

export class UserDto {
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
  fullName?: string;

  @ApiProperty({
    example: faker.person.fullName(),
    required: true,
    maxLength: 100,
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @Type(() => String)
  username: string;

  @ApiProperty({
    example: faker.internet.email(),
    required: true,
    maxLength: 100,
  })
  @Validate(EmailExistedValidator, [ValidatorExistType.EXISTED])
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  @Type(() => String)
  email: string;

  @ApiProperty({
    required: true,
    maxLength: 100,
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @Type(() => String)
  password: string;

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
  @IsNotEmpty()
  country: string;
}

export class UserLoginDto extends PickType(UserDto, ['email', 'password']) {
  @ApiProperty({
    example: 'lequangtrieu0304@gmail.com',
    required: true,
    maxLength: 100,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  @Type(() => String)
  email: string;

  @ApiProperty({
    example: '123456',
    required: true,
    maxLength: 100,
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @Type(() => String)
  password: string;
}

// export class UserFilter {
//
// }
//
// export class UserListQueryDto extends FilterQueryDto {
//   filter:
// }
