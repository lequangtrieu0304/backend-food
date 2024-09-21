import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuEntity, MenuSchema } from '@modules/menus/entities/menu.entity';
import { MenuController } from '@modules/menus/controllers/menu.controller';
import { MenuService } from '@modules/menus/services/menu.service';
import { CloudinaryModule } from '@providers/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MenuEntity.name,
        schema: MenuSchema,
      },
    ]),
    CloudinaryModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
