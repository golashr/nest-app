import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { HttpModule } from '@nestjs/axios';
import {
  AppController,
  CatController,
  HealthCheckController,
} from './controller';
import { CatService, AppService } from './service';
import { ChatGateway } from './chat';
import { RolesGuard, ThrottlerBehindProxyGuard } from './guards';
import { LoggerMiddleware } from './middleware';
import { User } from './entities';
import { LoggerModule, UserModule } from './modules';
import {
  AuthService,
  LocalStrategy,
  JwtStrategy,
  AuthJwtTokenBuilder,
} from './auth';
const guards = [ThrottlerBehindProxyGuard];
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'rosie.db.elephantsql.com',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: false,
      entities: [User],
      migrations: ['src/db-migrations/**/*.ts'],
    }),
    PassportModule,
    TerminusModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    LoggerModule,
  ],
  controllers: [AppController, CatController, HealthCheckController],
  providers: [
    AppService,
    AuthService,
    ChatGateway,
    CatService,
    LocalStrategy,
    JwtStrategy,
    AuthJwtTokenBuilder,
    ...guards,
    {
      provide: APP_GUARD,
      useFactory: (ref) => new RolesGuard(ref),
      inject: [Reflector],
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
