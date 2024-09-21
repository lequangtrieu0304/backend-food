import {
  DatabaseEntity,
  DatabaseProp,
  DatabaseSchema,
} from '@common/database/decorators/database.decorator';
import { DatabaseEntityAbstract } from '@common/database/abstracts/db.entity.abstract';
import { IDatabaseDocument } from '@common/database/interfaces/database.interface';
import * as bcrypt from 'bcryptjs';

@DatabaseEntity({ collection: 'users' })
export class UserEntity extends DatabaseEntityAbstract {
  @DatabaseProp({
    required: false,
    index: true,
    trim: true,
    type: String,
    maxlength: 100,
  })
  fullName?: string;

  @DatabaseProp({
    required: true,
    index: true,
    trim: true,
    type: String,
    maxlength: 50,
    minlength: 3,
  })
  username: string;

  @DatabaseProp({
    required: true,
    unique: true,
    index: true,
    trim: true,
    type: String,
    maxlength: 100,
  })
  email: string;

  @DatabaseProp({
    required: true,
    type: String,
    trim: true,
  })
  password: string;

  @DatabaseProp({
    required: false,
    index: true,
    default: true,
  })
  isVerified?: boolean;

  @DatabaseProp({
    required: false,
    maxlength: 200,
    trim: true,
  })
  address?: string;

  @DatabaseProp({
    required: false,
    maxlength: 50,
    trim: true,
  })
  city?: string;

  @DatabaseProp({
    required: true,
    type: String,
    trim: true,
  })
  country: string;
}

export const UserSchema = DatabaseSchema(UserEntity);
export type UserDoc = IDatabaseDocument<UserEntity>;

UserSchema.pre('save', async function (next) {
  const user = this as UserEntity;
  const SALT_ROUNDS = 10;
  try {
    user.password = bcrypt.hashSync(user.password, SALT_ROUNDS);
    next();
  } catch (error) {
    next(error);
  }
});
