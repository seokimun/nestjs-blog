import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(8000);
    console.log('8000번 포트 실행 중....');
}
bootstrap();
