import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove as chaves do dto
      forbidNonWhitelisted: true, // levantar erro quando a chave não existir
      transform: false, // tenta transormar o tipos de dados de param em dtos
    }),
    new ParseIntIdPipe(),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
