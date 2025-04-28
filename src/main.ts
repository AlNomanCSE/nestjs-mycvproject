import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(
    session({
      name: 'user_session',
      secret: 'my-secret-key',
      rolling: true, // Refresh the session cookie on every response
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      },
    }),
  );


  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();