import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
let cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // CORS
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
    allowedHeaders: [
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie',
    ],
  });

  dotenv.config();

  // Setting up swagger
  const config = new DocumentBuilder()
    .setTitle('Sales App API')
    .setDescription('the backend of the Sales App')
    .setVersion('1.0')
    .addTag('Sales App NestJS routes')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
