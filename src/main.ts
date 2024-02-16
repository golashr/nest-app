import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, RequestMethod } from '@nestjs/common';
import { AppModule } from './app.module';
import { CustomHttpExceptionFilter } from './filter';
import { ValidationPipe } from './pipes';
import { CustomLogger } from './modules/logger';

//import { ValidationPipe } from '@nestjs/common';
// app.useGlobalPipes(new ValidationPipe({ transform: true })); //This is applied globally to every route

const logger = new Logger('main');

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      cors: true,
      bufferLogs: true,
      logger: ['error', 'warn', 'log'], // <--- Add this line in options object
    });
    app.useGlobalPipes(new ValidationPipe()); //This is applied globally to every route
    app.set('trust proxy', 1);
    app.useLogger(new CustomLogger());
    app.useGlobalFilters(new CustomHttpExceptionFilter());
    app.setGlobalPrefix('api', {
      exclude: [{ path: 'health', method: RequestMethod.GET }],
    });
    const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(5577);
    logger.log(`application started on 5577`);
  } catch (error) {
    console.log(`error ${error.message}`);
  }
}
bootstrap();
