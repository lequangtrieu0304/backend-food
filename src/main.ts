import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import * as bodyParser from 'body-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as process from 'node:process';
import { ResponseTransformInterceptor } from '@common/interceptors/response.interceptor';
import { initSwagger } from '@common/swagger/swagger.setup';
import { useContainer } from 'class-validator';
import { ValidationExceptionFilter } from '@common/middlewares/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders:
      'content-type, authorization, accept-encoding, user-agent, accept, cache-control, connection, cookie, x-company-id, x-language',
    exposedHeaders:
      'x-ratelimit-reset, set-cookie, content-disposition, x-file-name',
  });

  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.use(bodyParser.json({ limit: '10mb' }));

  app.setGlobalPrefix('api/v1');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  initSwagger(app);

  await app.listen(process.env.PORT);
  const hostname = process.env.PORT;

  const logger = new Logger();
  logger.verbose('Server time: ' + new Date().toString());
  logger.verbose(`Running app on: ${hostname}`);
  logger.verbose(`   Api gateway: ${hostname}/api`);
}

void bootstrap();
