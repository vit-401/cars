import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {UserAccountSchema, UserAccountType} from "./userAccountType.schema";
import {UserEmailConfirmationSchema, UserEmailConfirmationType} from "./userEmailConfirmationType.schema";

export type UserDocument = UserType & Document;

@Schema()
export class UserType {
  @Prop({ type: UserAccountSchema, required: true })
  @ApiProperty({ type: () => UserAccountType })
  accountData: UserAccountType;

  @Prop({ type: UserEmailConfirmationSchema, required: true })
  @ApiProperty({ type: () => UserEmailConfirmationType })
  emailConfirmation: UserEmailConfirmationType;
}

export const UserSchema = SchemaFactory.createForClass(UserType);