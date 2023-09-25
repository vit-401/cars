import {ApiProperty} from "@nestjs/swagger";
import {Car} from "../schema/car.schema";
import {CreateCarDto} from "../dto/create-car.dto";
import {Schema} from "@nestjs/mongoose";

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

@Schema()
export class PaginatedResponse<T> {
  @ApiProperty({ type: [Car] })
  data: T[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalItems: number;
}