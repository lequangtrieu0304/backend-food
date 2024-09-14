import { Module } from '@nestjs/common';
import { UserService } from '@modules/users/services/user.service';
import { UserController } from '@modules/users/controllers/user.controller';
import { EmailExistedValidator } from '@modules/users/validators/email-exited.validator';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from '@modules/users/entities/user.entity';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          secret: config.get<string>('ACCESS_SECRET'),
          // signOptions: { expiresIn: config.ACCESS_TOKEN_EXP },
        }) as JwtModuleOptions,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, EmailExistedValidator],
})
export class UserModule {}
