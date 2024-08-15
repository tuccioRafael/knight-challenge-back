import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './middlewares/custon-exception-filter.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Knight API')
    .setDescription('Api de ficha de personagem de rpg')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  }));

  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
