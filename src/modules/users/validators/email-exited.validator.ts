import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ValidatorExistType } from '@common/enum-common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from '@modules/users/entities/user.entity';
import { Model } from 'mongoose';

interface MyValidationArguments extends ValidationArguments {
  constraints: [ValidatorExistType];
}

@Injectable()
@ValidatorConstraint({ name: 'EmailExistedValidator' })
export class EmailExistedValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
  ) {}

  async validate(value: string, args: MyValidationArguments) {
    const user = await this.userModel.findOne({ email: value });
    if (user) {
      this.defaultMessage(args);
      return false;
    }
    return true;
  }

  defaultMessage(args?: MyValidationArguments) {
    return 'EMAIL_USER_' + args.constraints[0];
  }
}
