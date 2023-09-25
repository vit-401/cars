import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserAccountDocument = UserAccountType & Document;

@Schema()
export class UserAccountType {
  @Prop({ required: true })
  @ApiProperty()
  id: string;

  @Prop({ required: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true })
  @ApiProperty()
  login: string;

  @Prop({ required: true })
  @ApiProperty()
  passwordHash: string;

  @Prop({ required: true })
  @ApiProperty()
  createdAt: Date;

  @Prop({ required: false, type: [String] })
  @ApiProperty()
  revokedTokens: string[];
}

export const UserAccountSchema = SchemaFactory.createForClass(UserAccountType);
