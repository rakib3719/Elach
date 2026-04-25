import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseTransformerInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseTransformerInterceptor());
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
