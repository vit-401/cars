import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type EmailConfirmationMessageDocument = EmailConfirmationMessageType & Document;

@Schema()
export class EmailConfirmationMessageType {
  @Prop({ required: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true })
  @ApiProperty()
  message: string;

  @Prop({ required: true })
  @ApiProperty()
  subject: string;

  @Prop({ required: true })
  @ApiProperty()
  isSent: boolean;

  @Prop({ required: true })
  @ApiProperty()
  createdAt: Date;
}

export const EmailConfirmationMessageSchema = SchemaFactory.createForClass(EmailConfirmationMessageType);
