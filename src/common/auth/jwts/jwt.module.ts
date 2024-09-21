import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ConfigService } from '@nestjs/config';
import { UserEntity, UserSchema } from '@modules/users/entities/user.entity';
import { JwtAuthStrategy } from '@/common/auth/jwts/jwt.strategy';
import { JwtAuthGuard } from '@/common/auth/jwts/jwt.guard';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule.register({ defaultStrategy: 'jwt-refresh-token' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          secret: config.get<string>('ACCESS_SECRET'),
        }) as JwtModuleOptions,
    }),
  ],
  providers: [JwtAuthStrategy, JwtAuthGuard],
  exports: [],
})
export class JwtAuthModule {}
