import { DatabaseProp } from '@/common/database/decorators/database.decorator';
import { v4 as uuidV4 } from 'uuid';

export abstract class DatabaseEntityAbstract {
  @DatabaseProp({
    type: String,
    auto: true,
    default: uuidV4,
  })
  _id?: string;

  @DatabaseProp({
    required: true,
    index: true,
    default: false,
  })
  deleted?: boolean;

  @DatabaseProp({
    required: false,
    index: 'asc',
    type: Date,
    default: new Date(),
  })
  createdAt?: Date;

  @DatabaseProp({
    required: false,
    type: String,
    ref: 'users',
    default: null,
  })
  createdBy?: string;

  @DatabaseProp({
    required: false,
    index: 'asc',
    type: Date,
    default: new Date(),
  })
  updatedAt?: Date;

  @DatabaseProp({
    required: false,
    index: true,
    default: null,
  })
  updatedBy?: string;

  @DatabaseProp({
    required: false,
    index: true,
    type: Date,
  })
  deletedAt?: Date;

  @DatabaseProp({
    required: false,
    index: true,
    default: null,
  })
  deletedBy?: string;
}
