import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from '@common/database/mongodb/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@modules/users/user.module';
import { LoggerMiddleware } from '@common/middlewares/logger.middleware';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply middleware to all routes
  }
}
