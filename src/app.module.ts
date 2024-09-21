import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from '@common/database/mongodb/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@modules/users/user.module';
import { LoggerMiddleware } from '@common/middlewares/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@common/auth/jwts/jwt.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthModule } from '@common/auth/jwts/jwt.module';
import { RestaurantModule } from '@modules/restaurants/restaurant.module';
import { CloudinaryModule } from '@providers/cloudinary/cloudinary.module';
import { MenuModule } from '@modules/menus/menu.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule.register({ defaultStrategy: 'jwt-refresh-token' }),
    JwtAuthModule,
    CloudinaryModule,

    UserModule,
    RestaurantModule,
    MenuModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply middleware to all routes
  }
}
