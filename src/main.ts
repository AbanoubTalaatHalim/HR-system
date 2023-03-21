import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('HR TASK')
    .setDescription('HR TASK')
    .setVersion('1.0')
    .addTag('TASK')
    .setExternalDoc('Postman Collection', '/api/task-json')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/task', app, document);
  await app.listen(3000);
}
bootstrap();
