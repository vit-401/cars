import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserEmailConfirmationDocument = UserEmailConfirmationType & Document;

@Schema()
export class UserEmailConfirmationType {
  @Prop({ required: true })
  @ApiProperty()
  isConfirmed: boolean;

  @Prop({ required: true })
  @ApiProperty()
  confirmationCode: string;

  @Prop({ required: true })
  @ApiProperty()
  expirationDate: Date;

  @Prop({ required: false, type: [Date] })
  @ApiProperty()
  sentEmails: Date[];
}

export const UserEmailConfirmationSchema = SchemaFactory.createForClass(UserEmailConfirmationType);
