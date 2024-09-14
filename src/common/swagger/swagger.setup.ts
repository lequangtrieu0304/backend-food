import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function initSwagger(app: INestApplication) {
  const configSwagger = new DocumentBuilder()
    .setTitle('Nestjs-food')
    .setDescription('Description document for Rest API')
    .setVersion('v1')
    .setLicense('Postman API Docs', '/apidoc-json')
    .addServer('http://localhost:3000')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup('/apidoc', app, document, {
    customSiteTitle: 'Nestjs' + ' API Docs',
    customCss: '.swagger-ui .topbar { display: none }',

    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
    },
  });
}
