import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { AuthModule } from '../auth/auth.module';
import {UserSchema} from "../../infrastructure/schema/userSchema.schema";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]), // Registering the model
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}