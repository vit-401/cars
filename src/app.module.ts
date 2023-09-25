import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './features/cars/cars.module';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import {ConfigModule} from "@nestjs/config";
import {ServeStaticModule} from "@nestjs/serve-static";
import {AuthController} from "./features/auth/auth.controller";
import {AuthService} from "./features/auth/auth.service";
import {UsersService} from "./features/users/users.service";
import {UsersRepository} from "./features/users/users.repository";
import {Scheduler} from "./infrastructure/notification/email.scheduler";
import {EmailService} from "./infrastructure/notification/email.service";
import {NotificationRepository} from "./infrastructure/notification/notification.repository";
import {LocalStrategy} from "./features/auth/strategies/local.strategy";
import {JwtStrategy} from "./features/auth/strategies/jwt.strategy";
import {JwtPayloadExtractorStrategy} from "./guards/common/jwt-payload-extractor.strategy";
import {JwtPayloadExtractorGuard} from "./guards/common/jwt-payload-extractor.guard";
import {EmailConfirmationMessageSchema} from "./infrastructure/schema/EmailConfirmationMessageType.schema";
import {UserSchema} from "./infrastructure/schema/userSchema.schema";

@Module({
  imports:  [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema },
      { name: 'EmailsQueue', schema: EmailConfirmationMessageSchema },
    ]),

    CarsModule,
  ],
  controllers: [
    AppController,
    AuthController,
  ],
  providers: [
    AppService,
    AuthService,
    UsersService,
    UsersRepository,
    AuthService,
    //Other
    Scheduler,
    EmailService,
    NotificationRepository,
    LocalStrategy,
    JwtStrategy,
    JwtPayloadExtractorStrategy,
    JwtPayloadExtractorGuard,
  ],
})
export class AppModule {}
