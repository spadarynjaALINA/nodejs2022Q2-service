import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { MyLogger } from './modules/logger/logger.service';
import { HttpExceptionFilter } from './modules/logger/httpexception-filter.service';

async function bootstrap() {
  const logger = new MyLogger();
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger));

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  logger.log(`Application listening on port ${PORT}`);
  await app.listen(PORT ?? 3000);
}
bootstrap();
