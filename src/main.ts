import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const env = app.get(ConfigService);
    const port = env.get('APP_PORT') || 3000;

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    app.enableCors({
        origin: true, //어떤 프론트사이트든 접근허용 //개발이 완료되면 false로 바꿔줄것
        credentials: true,
    });

    app.use(
        ['/docs', '/docs-json'],
        expressBasicAuth({
            challenge: true,
            users: {
                [env.get<string>('SWAGGER_USER')]:
                    env.get<string>('SWAGGER_PASSWORD'),
            },
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('blog API')
        .setDescription('API문서 입니다.')
        .setVersion('1.0.0')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);

    await app.listen(port);
    console.log(`${port}번 포트 실행 중....`);
}
bootstrap();
