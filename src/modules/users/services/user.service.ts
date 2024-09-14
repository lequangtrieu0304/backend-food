import { Injectable } from '@nestjs/common';
import { UserDoc, UserEntity } from '@modules/users/entities/user.entity';
import { DatabaseRepositoryAbstract } from '@common/database/abstracts/db.repository.abstract';
import { DatabaseModel } from '@common/database/decorators/database.decorator';
import { Model } from 'mongoose';
import { UserLoginDto } from '@modules/users/dtos/user.dto';
import { BadRequest } from '@common/exceptions/exception.resolver';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService extends DatabaseRepositoryAbstract<
  UserEntity,
  UserDoc
> {
  constructor(
    @DatabaseModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
    private readonly jwtService: JwtService,
  ) {
    super(userModel);
  }

  async login(body: UserLoginDto) {
    const user = await this.findOne<UserDoc>({ email: body.email });
    if (!user) throw new BadRequest({ message: 'Not found email!' });

    const matchPwd = bcrypt.compareSync(body.password, user.password);
    if (!matchPwd) throw new BadRequest({ message: 'Password incorrect!!' });
    return {
      ...user.toObject(),
      token: this.jwtService.sign({ email: user.email }),
    };
  }
}
