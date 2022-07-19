import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from '../setup-swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  setupSwagger(app);
  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
