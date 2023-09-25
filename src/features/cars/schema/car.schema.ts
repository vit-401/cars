import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop({ required: true })
  @ApiProperty()
  brand: string;

  @Prop({ required: true })
  @ApiProperty()
  car_number: string;

  @Prop({ required: true })
  @ApiProperty()
  model: string;

  @Prop({ required: true })
  @ApiProperty()
  engine_type: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);