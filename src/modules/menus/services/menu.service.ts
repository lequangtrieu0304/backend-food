import { Injectable } from '@nestjs/common';
import { DatabaseRepositoryAbstract } from '@common/database/abstracts/db.repository.abstract';
import { DatabaseModel } from '@common/database/decorators/database.decorator';
import { Model } from 'mongoose';
import { MenuDoc, MenuEntity } from '@modules/menus/entities/menu.entity';

@Injectable()
export class MenuService extends DatabaseRepositoryAbstract<
  MenuEntity,
  MenuDoc
> {
  constructor(
    @DatabaseModel(MenuEntity.name)
    private readonly menuModel: Model<MenuEntity>,
  ) {
    super(menuModel);
  }
}
